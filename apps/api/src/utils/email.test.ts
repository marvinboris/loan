import nodemailer from 'nodemailer';
import { EmailOptions, sendEmail } from './email';

// Mock the entire nodemailer module
jest.mock('nodemailer');

const mockCreateTestAccount = jest.fn();
const mockCreateTransport = jest.fn();
const mockSendMail = jest.fn();
const mockGetTestMessageUrl = jest.fn();

// Mock implementations
(nodemailer.createTestAccount as jest.Mock) = mockCreateTestAccount;
(nodemailer.createTransport as jest.Mock) = mockCreateTransport;
(nodemailer.getTestMessageUrl as jest.Mock) = mockGetTestMessageUrl;

describe('sendEmail', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetAllMocks();
    process.env = { ...originalEnv };

    // Setup default mock implementations
    mockCreateTestAccount.mockResolvedValue({
      user: 'test@ethereal.email',
      pass: 'test-password',
    });

    mockSendMail.mockResolvedValue({
      messageId: 'test-message-id',
      accepted: ['recipient@test.com'],
      rejected: [],
    });

    mockCreateTransport.mockReturnValue({
      sendMail: mockSendMail,
    });

    mockGetTestMessageUrl.mockReturnValue(
      'https://ethereal.email/message/test'
    );
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should send email with development settings when NODE_ENV=development', async () => {
    process.env.NODE_ENV = 'development';

    const emailOptions: EmailOptions = {
      to: 'test@example.com',
      subject: 'Test Subject',
      text: 'Test email content',
    };

    await sendEmail(emailOptions);

    expect(mockCreateTestAccount).toHaveBeenCalled();
    expect(mockCreateTransport).toHaveBeenCalledWith({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'test@ethereal.email',
        pass: 'test-password',
      },
    });
    expect(mockSendMail).toHaveBeenCalledWith({
      from: '"Your App" <noreply@yourapp.com>',
      to: 'test@example.com',
      subject: 'Test Subject',
      text: 'Test email content',
    });
  });

  it('should send email with production settings when SMTP env vars are set', async () => {
    process.env.NODE_ENV = 'production';
    process.env.SMTP_HOST = 'smtp.prod.com';
    process.env.SMTP_PORT = '465';
    process.env.SMTP_SECURE = 'true';
    process.env.SMTP_USER = 'prod-user';
    process.env.SMTP_PASS = 'prod-password';
    process.env.EMAIL_FROM = '"Prod App" <noreply@prod.com>';

    const emailOptions: EmailOptions = {
      to: 'prod@example.com',
      subject: 'Prod Subject',
      text: 'Prod email content',
      html: '<p>Prod email content</p>',
    };

    await sendEmail(emailOptions);

    expect(mockCreateTestAccount).not.toHaveBeenCalled();
    expect(mockCreateTransport).toHaveBeenCalledWith({
      host: 'smtp.prod.com',
      port: 465,
      secure: true,
      auth: {
        user: 'prod-user',
        pass: 'prod-password',
      },
    });
    expect(mockSendMail).toHaveBeenCalledWith({
      from: '"Prod App" <noreply@prod.com>',
      to: 'prod@example.com',
      subject: 'Prod Subject',
      text: 'Prod email content',
      html: '<p>Prod email content</p>',
    });
  });

  it('should use default values when env vars are not set', async () => {
    process.env.NODE_ENV = 'production';
    // Clear all SMTP related env vars
    delete process.env.SMTP_HOST;
    delete process.env.SMTP_PORT;
    delete process.env.SMTP_SECURE;
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASS;
    delete process.env.EMAIL_FROM;

    const emailOptions: EmailOptions = {
      to: 'default@example.com',
      subject: 'Default Subject',
      text: 'Default email content',
    };

    await sendEmail(emailOptions);

    expect(mockCreateTransport).toHaveBeenCalledWith({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: undefined,
        pass: undefined,
      },
    });
  });

  it('should log message info in development mode', async () => {
    process.env.NODE_ENV = 'development';
    const consoleSpy = jest.spyOn(console, 'log');

    await sendEmail({
      to: 'test@example.com',
      subject: 'Test',
      text: 'Test',
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      'Message sent: %s',
      'test-message-id'
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      'Preview URL: %s',
      'https://ethereal.email/message/test'
    );

    consoleSpy.mockRestore();
  });

  it('should not log message info in production mode', async () => {
    process.env.NODE_ENV = 'production';
    const consoleSpy = jest.spyOn(console, 'log');

    await sendEmail({
      to: 'test@example.com',
      subject: 'Test',
      text: 'Test',
    });

    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should throw an error if email sending fails', async () => {
    mockSendMail.mockRejectedValue(new Error('SMTP error'));

    await expect(
      sendEmail({
        to: 'test@example.com',
        subject: 'Test',
        text: 'Test',
      })
    ).rejects.toThrow('SMTP error');
  });
});
