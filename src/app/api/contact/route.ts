import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Define schema for form validation
const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email(),
  message: z.string().min(10),
});

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    if (!process.env.SMTP_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Missing SMTP configuration. Please check environment variables.');
    }

    // Parse and validate request body
    const body = await request.json();
    const { name, phone, email, message } = contactSchema.parse(body);

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form Submission – Next Generation Athlete</title>
  <style>
    /* Reset styles for email client compatibility */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
      background-color: #e5e7eb;
      color: #1f2937;
      line-height: 1.6;
      margin: 0;
    }

    .container {
      max-width: 720px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
    }

    .header {
      background: linear-gradient(135deg, #1d4ed8 0%, #60a5fa 100%);
      padding: 40px 30px;
      text-align: center;
      color: #ffffff;
      position: relative;
      overflow: hidden;
    }

    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(90deg, #f97316, #ef4444, #10b981);
    }

    .header h1 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 10px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .header p {
      font-size: 16px;
      font-weight: 400;
      opacity: 0.9;
    }

    .banner {
      background: linear-gradient(90deg, #10b981, #047857);
      padding: 14px;
      text-align: center;
      color: #ffffff;
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.1);
    }

    .content {
      padding: 35px;
      background-color: #f9fafb;
    }

    .section {
      margin-bottom: 25px;
      padding: 25px;
      background-color: #ffffff;
      border-radius: 10px;
      border-left: 5px solid #1d4ed8;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .section:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    }

    .section h2 {
      font-size: 22px;
      font-weight: 600;
      color: #1d4ed8;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .section h2::before {
      content: '★';
      color: #f97316;
      font-size: 20px;
    }

    .field {
      margin-bottom: 18px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .field-icon {
      font-size: 18px;
      color: #1d4ed8;
    }

    .label {
      font-size: 12px;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 6px;
    }

    .value {
      font-size: 16px;
      font-weight: 500;
      color: #1f2937;
    }

    .message-content {
      background-color: #eff6ff;
      padding: 20px;
      border-radius: 8px;
      font-size: 16px;
      color: #1f2937;
      font-style: italic;
      line-height: 1.8;
      border-left: 4px solid #1d4ed8;
      margin-top: 10px;
    }

    .cta-button {
      display: inline-block;
      background: linear-gradient(90deg, #f97316, #ef4444);
      color: #ffffff;
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-size: 16px;
      font-weight: 600;
      text-align: center;
      margin: 20px auto;
      display: block;
      max-width: 200px;
      transition: transform 0.2s ease;
    }

    .cta-button:hover {
      transform: scale(1.05);
    }

    .footer {
      background: linear-gradient(135deg, #1e3a8a, #1e40af);
      padding: 25px;
      text-align: center;
      color: #ffffff;
      font-size: 14px;
      line-height: 1.8;
    }

    .footer a {
      color: #93c5fd;
      text-decoration: none;
      font-weight: 600;
      margin: 0 8px;
    }

    .footer a:hover {
      text-decoration: underline;
    }

    .status-badge {
      display: inline-block;
      background: linear-gradient(135deg, #10b981, #047857);
      color: #ffffff;
      padding: 8px 14px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-left: 10px;
    }

    @media (max-width: 600px) {
      .container {
        margin: 15px;
      }

      .header {
        padding: 25px;
      }

      .header h1 {
        font-size: 26px;
      }

      .content {
        padding: 20px;
      }

      .section {
        padding: 15px;
      }

      .field {
        flex-direction: column;
        align-items: flex-start;
      }

      .cta-button {
        max-width: 100%;
        padding: 10px 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏆 Next Generation Athlete</h1>
      <p>Unleash Your Athletic Potential</p>
    </div>
    <div class="banner">
      New Contact Form Submission <span class="status-badge">Pending</span>
    </div>
    <div class="content">
      <div class="section">
        <h2>Contact Information</h2>
        <div class="field">
          <span class="field-icon">👤</span>
          <div>
            <div class="label">Full Name</div>
            <div class="value">${name}</div>
          </div>
        </div>
        <div class="field">
          <span class="field-icon">✉️</span>
          <div>
            <div class="label">Email Address</div>
            <div class="value">${email}</div>
          </div>
        </div>
        <div class="field">
          <span class="field-icon">📞</span>
          <div>
            <div class="label">Phone Number</div>
            <div class="value">${phone}</div>
          </div>
        </div>
      </div>
      <div class="section">
        <h2>Message</h2>
        <div class="message-content">${message}</div>
      </div>
      <a href="mailto:${email}?subject=Re:%20Contact%20Form%20Submission" class="cta-button">Reply to This Inquiry</a>
    </div>
    <div class="footer">
      <strong>Next Generation Athlete</strong><br>
      Västanforsgatan 30 A, 214 50 Malmö, Sweden<br>
      <a href="mailto:info@sayesperformance.se">info@sayesperformance.se</a> | +46 72 333 87 87<br>
      <div style="margin-top: 10px;">
        <a href="https://twitter.com/sayesperformance">Twitter</a> |
        <a href="https://instagram.com/sayesperformance">Instagram</a> |
        <a href="https://sayesperformance.se">Website</a>
      </div>
      <div style="margin-top: 10px;">© 2025 Next Generation Athlete. All rights reserved.</div>
    </div>
  </div>
</body>
</html>
      `,
    });

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send email', details: error },
      { status: 500 }
    );
  }
}