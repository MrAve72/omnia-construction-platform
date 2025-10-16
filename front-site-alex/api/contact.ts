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
    <p style="margin: 8px 0;"><strong>Email:</strong> ${sanitize(email)}</p>
    <p style="margin: 8px 0;"><strong>Phone:</strong> ${sanitize(phone)}</p>
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
  const name = typeof data?.name === "string" ? data.name.trim() : "";
  const email = typeof data?.email === "string" ? data.email.trim() : "";
  const phone = typeof data?.phone === "string" ? data.phone.trim() : "";
  const message = typeof data?.message === "string" ? data.message.trim() : "";

  if (!name || !email || !phone || !message) {
    return response.status(400).json({ error: "All fields are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

  if (!emailRegex.test(email)) {
    return response.status(400).json({ error: "Please provide a valid email address." });
  }

  if (!phoneRegex.test(phone)) {
    return response.status(400).json({ error: "Please provide a valid US phone number." });
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
      html: createEmailHtml(name, email, phone, message),
      text: `New contact form submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
    });

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return response.status(500).json({ error: "Unable to send message right now." });
  }
}
