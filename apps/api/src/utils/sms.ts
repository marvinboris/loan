import axios from 'axios';
import { config } from '../config';

interface SmsResponse {
  success: boolean;
  code: number;
  message: string;
}

export async function sendSms(
  mobile: string,
  originalMessage: string
): Promise<SmsResponse> {
  if (config.modeTest)
    return { success: true, code: 900, message: 'Test mode enabled' };

  if (mobile.startsWith('+')) mobile = mobile.split('+').pop();

  const keyApi = encodeURIComponent(config.smsKey);
  const sender = 'SURETECH';
  const destination = encodeURIComponent(mobile);
  const message = originalMessage + ' (SURETECH)';

  const urlBase = `https://obitsms.com/api/v2/bulksms?key_api=${keyApi}&sender=${sender}&destination=${destination}&message=${message}`;

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
