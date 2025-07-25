// utils/whatsapp.ts
import twilio from 'twilio';
import { config } from '../config';

const client = twilio(config.twilio.accountSid, config.twilio.authToken);

export const sendWhatsapp = async (
  to: string,
  body: string
): Promise<boolean> => {
  try {
    // Format du numéro: 'whatsapp:+33612345678'
    const formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;

    await client.messages.create({
      body,
      from: config.twilio.phoneNumber,
      to: formattedTo,
    });

    return true;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    return false;
  }
};
