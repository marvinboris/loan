import path from 'path';

// config.ts
export const config = {
  appName: process.env.APP_NAME as string,
  modeTest: process.env.MODE_TEST === 'true',
  supabaseUrl: process.env.SUPABASE_URL as string,
  supabaseKey: process.env.SUPABASE_KEY as string,
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',

  smsKey: process.env.SMS_KEY || '',

  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_WHATSAPP_NUMBER, // Format: 'whatsapp:+14155238886'
  },

  uploadsPath: path.join(__dirname, '..', 'uploads'),

  iwomiPay: {
    url: process.env.IWOMIPAY_URL,
    username: process.env.IWOMIPAY_USERNAME,
    password: process.env.IWOMIPAY_PASSWORD,
    accountKeys: {
      momo: {
        credit: btoa(
          `${process.env.IWOMIPAY_MOMO_CREDIT_API_KEY}:${process.env.IWOMIPAY_MOMO_CREDIT_API_SECRET}`
        ),
        debit: btoa(
          `${process.env.IWOMIPAY_MOMO_DEBIT_API_KEY}:${process.env.IWOMIPAY_MOMO_DEBIT_API_SECRET}`
        ),
      },
      om: {
        credit: btoa(
          `${process.env.IWOMIPAY_OM_CREDIT_API_KEY}:${process.env.IWOMIPAY_OM_CREDIT_API_SECRET}`
        ),
        debit: btoa(
          `${process.env.IWOMIPAY_OM_DEBIT_API_KEY}:${process.env.IWOMIPAY_OM_DEBIT_API_SECRET}`
        ),
      },
    },
  },
};
