import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

type ResponseData = {
  success: boolean;
  message: string;
  error?: string;
  id?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Use POST.',
    });
  }

  const { contactName, email, message } = req.body || {};

  // Input validation
  if (!contactName || typeof contactName !== 'string' || !contactName.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Please provide your name.',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.',
    });
  }

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a message.',
    });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || apiKey === 'your_resend_api_key_here') {
    console.warn(
      '[Resend API] RESEND_API_KEY is not configured. Simulating success in development mode.'
    );
    return res.status(200).json({
      success: true,
      message: 'Your message was received (Dev mode: set RESEND_API_KEY in .env to deliver real emails).',
    });
  }

  try {
    const resend = new Resend(apiKey);
    const receiverEmail =
      process.env.CONTACT_RECEIVER_EMAIL || 'sahsisunny007@gmail.com';
    const senderEmail =
      process.env.RESEND_FROM_EMAIL || 'GitTrackr Contact <onboarding@resend.dev>';

    const { data, error } = await resend.emails.send({
      from: senderEmail,
      to: [receiverEmail],
      replyTo: email.trim(),
      subject: `[GitTrackr] Message from ${contactName.trim()}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #e2e8f0; padding: 20px; }
              .card { background-color: #111827; border: 1px solid #1f2937; border-radius: 12px; max-width: 600px; margin: 0 auto; overflow: hidden; }
              .header { background: linear-gradient(135deg, #0ea5e9, #38bdf8); padding: 24px; color: #040914; }
              .header h2 { margin: 0; font-size: 22px; font-weight: 800; }
              .content { padding: 24px; }
              .field { margin-bottom: 18px; }
              .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; font-weight: 700; margin-bottom: 4px; }
              .value { font-size: 16px; color: #f8fafc; }
              .message-box { background-color: #1e293b; border-left: 4px solid #38bdf8; padding: 16px; border-radius: 6px; white-space: pre-wrap; font-size: 15px; line-height: 1.6; color: #f1f5f9; }
              .footer { padding: 16px 24px; background-color: #0b0f19; border-top: 1px solid #1f2937; font-size: 12px; color: #64748b; text-align: center; }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="header">
                <h2>GitTrackr Inbound Contact</h2>
                <div style="font-size: 14px; opacity: 0.9; margin-top: 4px;">New message via GitTrackr contact form</div>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Sender Name</div>
                  <div class="value">${contactName.trim()}</div>
                </div>
                <div class="field">
                  <div class="label">Email Address</div>
                  <div class="value"><a href="mailto:${email.trim()}" style="color: #38bdf8; text-decoration: none;">${email.trim()}</a></div>
                </div>
                <div class="field">
                  <div class="label">Message</div>
                  <div class="message-box">${message.trim()}</div>
                </div>
              </div>
              <div class="footer">
                GitTrackr • Sent automatically from the landing page contact form.
              </div>
            </div>
          </body>
        </html>
      `,
      text: `New contact submission from GitTrackr:\n\nName: ${contactName.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
    });

    if (error) {
      console.error('[Resend Error]', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to deliver message via Resend.',
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      id: data?.id,
    });
  } catch (err: any) {
    console.error('[Resend Exception]', err);
    return res.status(500).json({
      success: false,
      message: err.message || 'Internal server error while sending email.',
      error: err.message,
    });
  }
}

