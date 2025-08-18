import nodemailer from 'nodemailer';

export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail(options: EmailOptions) {
  // Create a test account if in development
  let testAccount;
  if (process.env.NODE_ENV === 'development') {
    testAccount = await nodemailer.createTestAccount();
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER || testAccount?.user,
      pass: process.env.SMTP_PASS || testAccount?.pass,
    },
  });

  // Send mail
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || '"Your App" <noreply@yourapp.com>',
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}
