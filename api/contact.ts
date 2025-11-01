import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

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

const createEmailHtml = (email: string, phone: string, message: string) => `
  <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
    <h2 style="margin-bottom: 16px;">New Contact Form Submission</h2>
    <p style="margin: 8px 0;"><strong>Email:</strong> ${sanitize(email)}</p>
    <p style="margin: 8px 0;"><strong>Phone:</strong> ${renderValue(phone)}</p>
    <p style="margin: 16px 0;"><strong>Message:</strong></p>
    <p style="background: #f9fafb; padding: 12px; border-radius: 8px; border: 1px solid #e5e7eb;">${sanitize(
      message
    ).replace(/\n/g, "<br />")}</p>
  </div>
`;

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method Not Allowed" });
  }

  const data = parseBody(request);
  const email = typeof data?.email === "string" ? data.email.trim() : "";
  const phone = typeof data?.phone === "string" ? data.phone.trim() : "";
  const message = typeof data?.message === "string" ? data.message.trim() : "";

  if (!message) {
    return response.status(400).json({ error: "Message is required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return response.status(400).json({ error: "Please provide a valid email address." });
  }

  if (!resend || !resendApiKey) {
    console.error("Missing RESEND_API_KEY environment variable.");
    return response.status(500).json({ error: "Email service is not configured." });
  }

  if (!recipientEmail) {
    console.error("Missing CONTACT_RECIPIENT_EMAIL environment variable.");
    return response.status(500).json({ error: "Recipient email is not configured." });
  }

  try {
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Omnia Construction <onboarding@resend.dev>",
      to: recipientEmail,
      reply_to: email,
      subject: "New message from Omnia Construction contact form",
      html: createEmailHtml(email, phone, message),
      text: `New contact form submission

Email: ${email}
Phone: ${phone || "Not provided"}

Message:
${message}`,
    });

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return response.status(500).json({ error: "Unable to send message right now." });
  }
}
