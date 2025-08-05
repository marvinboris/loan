import axios from 'axios';
import { config } from '../config';

interface SmsResponse {
  success: boolean;
  code: number;
  message: string;
}

export async function sendSms(mobile: string, message: string) {
  if (mobile.startsWith('+')) mobile = mobile.split('+').pop();

  const urlBase = `https://obitsms.com/api/v2/bulksms?key_api=${encodeURIComponent(
    config.smsKey
  )}&sender=${encodeURIComponent(
    config.appName
  )}&destination=${encodeURIComponent(mobile)}&message=${message}`;

  try {
    const response = await axios.get<SmsResponse>(urlBase, {
      headers: { Accept: 'application/json' },
    });

    return response.data;
  } catch (error) {
    console.error('Error while sending SMS:', error);
    throw error;
  }
}
