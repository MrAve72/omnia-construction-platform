import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { v4 as uuidv4 } from "uuid";
import * as Sentry from "@sentry/node";
import { Redis } from "@upstash/redis";

// Initialize Sentry
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.VERCEL_ENV || "development",
    tracesSampleRate: 1.0,
  });
}

// Initialize Upstash Redis for rate limiting
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

const resendApiKey = process.env.RESEND_API_KEY;
const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const sanitize = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const renderValue = (value: string) =>
  value ? sanitize(value) : '<span style="color:#6b7280;">Not provided</span>';

const parseBody = (request: VercelRequest) => {
  if (!request.body) return null;
  if (typeof request.body === "string") {
    try {
      return JSON.parse(request.body);
    } catch {
      return null;
    }
  }

  return request.body;
};

const createEmailHtml = (name: string, email: string, phone: string, message: string) => `
  <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
    <h2 style="margin-bottom: 16px;">New Contact Form Submission</h2>
    <p style="margin: 8px 0;"><strong>Name:</strong> ${sanitize(name)}</p>
    <p style="margin: 8px 0;"><strong>Email:</strong> ${renderValue(email)}</p>
    <p style="margin: 8px 0;"><strong>Phone:</strong> ${renderValue(phone)}</p>
    <p style="margin: 16px 0;"><strong>Message:</strong></p>
    <p style="background: #f9fafb; padding: 12px; border-radius: 8px; border: 1px solid #e5e7eb;">${sanitize(
      message
    ).replace(/\n/g, "<br />")}</p>
  </div>
`;

export default async function handler(request: VercelRequest, response: VercelResponse) {
  // Generate correlation ID for request tracing
  const requestId = uuidv4();

  // Set Sentry context
  Sentry.setContext("request", {
    requestId,
    method: request.method,
    headers: request.headers,
  });

  // Set security headers
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("X-Frame-Options", "DENY");
  response.setHeader("X-XSS-Protection", "1; mode=block");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  response.setHeader("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'");
  response.setHeader("X-Request-ID", requestId);

  console.log({ requestId, event: "request_received", method: request.method });

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    console.log({ requestId, event: "method_not_allowed", method: request.method });
    return response.status(405).json({ error: "Method Not Allowed" });
  }

  // Rate limiting check
  if (redis) {
    const ip = (request.headers["x-forwarded-for"] as string)?.split(",")[0] ||
                request.headers["x-real-ip"] as string ||
                "unknown";
    const rateLimitKey = `rate_limit:contact:${ip}`;

    try {
      const requests = await redis.incr(rateLimitKey);

      if (requests === 1) {
        // Set expiry of 1 hour on first request
        await redis.expire(rateLimitKey, 3600);
      }

      if (requests > 10) {
        console.log({ requestId, event: "rate_limit_exceeded", ip, requests });
        return response.status(429).json({
          error: "Too many requests. Please try again later."
        });
      }

      console.log({ requestId, event: "rate_limit_check", ip, requests });
    } catch (error) {
      console.error({ requestId, event: "rate_limit_error", error });
      // Continue without rate limiting if Redis fails
    }
  }

  const data = parseBody(request);
  const name = typeof data?.name === "string" ? data.name.trim() : "";
  const email = typeof data?.email === "string" ? data.email.trim() : "";
  const phone = typeof data?.phone === "string" ? data.phone.trim() : "";
  const message = typeof data?.message === "string" ? data.message.trim() : "";

  if (!name || !message) {
    return response.status(400).json({ error: "Name and message are required." });
  }

  if (message.length > 5000) {
    return response.status(400).json({
      error: "Message is too long. Please limit your message to 5000 characters."
    });
  }

  if (!email && !phone) {
    return response.status(400).json({ error: "Please provide at least an email or a phone number." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

  if (email && !emailRegex.test(email)) {
    return response.status(400).json({ error: "Please provide a valid email address." });
  }

  if (phone && !phoneRegex.test(phone)) {
    return response.status(400).json({ error: "Please provide a valid US phone number." });
  }

  if (!resend || !resendApiKey) {
    console.error({ requestId, event: "missing_resend_key" });
    return response.status(500).json({ error: "Email service is not configured." });
  }

  if (!recipientEmail) {
    console.error({ requestId, event: "missing_recipient_email" });
    return response.status(500).json({ error: "Recipient email is not configured." });
  }

  console.log({ requestId, event: "validation_passed", hasEmail: !!email, hasPhone: !!phone });

  // Email sending with retry logic
  const sendEmailWithRetry = async (maxRetries = 3) => {
    const emailData = {
      from: process.env.CONTACT_FROM_EMAIL ?? "Omnia Construction <onboarding@resend.dev>",
      to: recipientEmail,
      ...(email ? { reply_to: email } : {}),
      subject: "New message from Omnia Construction contact form",
      html: createEmailHtml(name, email, phone, message),
      text: `New contact form submission

Name: ${name}
Email: ${email || "Not provided"}
Phone: ${phone || "Not provided"}

Message:
${message}`,
    };

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        console.log({ requestId, event: "sending_email", attempt: attempt + 1, recipient: recipientEmail });
        await resend.emails.send(emailData);
        console.log({ requestId, event: "email_sent_successfully", attempt: attempt + 1 });
        return true;
      } catch (error) {
        const isLastAttempt = attempt === maxRetries - 1;
        console.error({
          requestId,
          event: "email_send_failed",
          attempt: attempt + 1,
          isLastAttempt,
          error: error instanceof Error ? error.message : "Unknown error"
        });

        if (isLastAttempt) {
          throw error; // Throw on last attempt
        }

        // Exponential backoff: 1s, 2s, 4s
        const waitTime = Math.pow(2, attempt) * 1000;
        console.log({ requestId, event: "retrying_email", waitTime });
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }

    return false;
  };

  try {
    await sendEmailWithRetry();
    return response.status(200).json({ success: true });
  } catch (error) {
    // Capture error in Sentry
    Sentry.captureException(error, {
      tags: {
        endpoint: "contact",
        requestId,
      },
      extra: {
        name,
        hasEmail: !!email,
        hasPhone: !!phone,
      },
    });

    return response.status(500).json({ error: "Unable to send message right now. Please try again." });
  }
}
