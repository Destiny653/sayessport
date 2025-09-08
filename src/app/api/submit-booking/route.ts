import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Define schema for form validation
const bookingSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters' }),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Invalid date format' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phoneNumber: z.string().min(6, { message: 'Phone number must be at least 6 characters' }),
  sports: z.string().min(1, { message: 'Sports field is required' }),
  sportsClub: z.string().optional(),
  position: z.string().optional(),
  trainingGoals: z.string().min(10, { message: 'Training goals must be at least 10 characters' }),
  preferredTrainingDays: z.string().min(1, { message: 'Preferred training days are required' }),
  additionalMessage: z.string().optional(),
  packageId: z.string().min(1, { message: 'Package ID is required' }),
  packageTitle: z.string().min(1, { message: 'Package title is required' }),
});

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Missing SMTP configuration. Please check environment variables.');
    }

    // Parse and validate request body
    const body = await request.json();
    const {
      fullName,
      dateOfBirth,
      email,
      phoneNumber,
      sports,
      sportsClub,
      position,
      trainingGoals,
      preferredTrainingDays,
      additionalMessage,
      packageId,
      packageTitle,
    } = bookingSchema.parse(body);

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Booking Request: ${packageTitle} (ID: ${packageId})`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Request – Next Generation Athlete</title>
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

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 20px;
      margin-top: 12px;
    }

    .grid-item {
      padding: 16px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #1d4ed8;
      transition: all 0.2s ease;
    }

    .grid-item:hover {
      background: #e9ecef;
      border-left-color: #f97316;
    }

    .grid-item .label {
      margin-bottom: 4px;
    }

    .grid-item .value {
      margin-bottom: 0;
      font-size: 15px;
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

      .grid {
        grid-template-columns: 1fr;
        gap: 15px;
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
      New Booking Request <span class="status-badge">Pending</span>
    </div>
    <div class="content">
      <div class="section">
        <h2>📦 Package Details</h2>
        <div class="grid">
          <div class="grid-item">
            <div class="label">Package Title</div>
            <div class="value">${packageTitle}</div>
          </div>
          <div class="grid-item">
            <div class="label">Package ID</div>
            <div class="value">${packageId}</div>
          </div>
        </div>
      </div>
      <div class="section">
        <h2>👤 Athlete Information</h2>
        <div class="grid">
          <div class="grid-item">
            <span class="field-icon">👤</span>
            <div>
              <div class="label">Full Name</div>
              <div class="value">${fullName}</div>
            </div>
          </div>
          <div class="grid-item">
            <span class="field-icon">🎂</span>
            <div>
              <div class="label">Date of Birth</div>
              <div class="value">${dateOfBirth}</div>
            </div>
          </div>
          <div class="grid-item">
            <span class="field-icon">✉️</span>
            <div>
              <div class="label">Email Address</div>
              <div class="value">${email}</div>
            </div>
          </div>
          <div class="grid-item">
            <span class="field-icon">📞</span>
            <div>
              <div class="label">Phone Number</div>
              <div class="value">${phoneNumber}</div>
            </div>
          </div>
          <div class="grid-item">
            <span class="field-icon">🏀</span>
            <div>
              <div class="label">Primary Sports</div>
              <div class="value">${sports}</div>
            </div>
          </div>
          <div class="grid-item">
            <span class="field-icon">🏟️</span>
            <div>
              <div class="label">Sports Club</div>
              <div class="value">${sportsClub || 'Not provided'}</div>
            </div>
          </div>
          <div class="grid-item">
            <span class="field-icon">🎯</span>
            <div>
              <div class="label">Position</div>
              <div class="value">${position || 'Not provided'}</div>
            </div>
          </div>
          <div class="grid-item">
            <span class="field-icon">📅</span>
            <div>
              <div class="label">Preferred Training Days</div>
              <div class="value">${preferredTrainingDays}</div>
            </div>
          </div>
        </div>
        <div class="field" style="margin-top: 20px;">
          <span class="field-icon">💪</span>
          <div>
            <div class="label">Training Goals</div>
            <div class="value">${trainingGoals}</div>
          </div>
        </div>
      </div>
      <div class="section">
        <h2>💬 Additional Message</h2>
        <div class="message-content">${additionalMessage || 'No additional message provided'}</div>
      </div>
      <a href="mailto:${email}?subject=Re:%20Booking%20Request%20-%20${packageTitle}" class="cta-button">Reply to This Booking</a>
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
      { message: 'Booking submitted successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting booking:', error);
    
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