import axios, { AxiosInstance } from 'axios';
import { config } from '../config';

class IwomiPay {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.iwomiPay.url,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private async authenticate() {
    const res = await this.client.post<{
      status: string;
      message: string;
      token?: string;
    }>('authenticate', {
      username: config.iwomiPay.username,
      password: config.iwomiPay.password,
    });
    return res.data;
  }

  async payment(credentials: {
    amount: string;
    motif: string;
    tel: string;
    op_type: 'debit' | 'credit';
    type: 'momo' | 'om';
  }) {
    const { token } = await this.authenticate();
    const accountKey = btoa(
      credentials.type === 'momo'
        ? `${config.iwomiPay.momoApiKey}:${config.iwomiPay.momoApiSecret}`
        : `${config.iwomiPay.omApiKey}:${config.iwomiPay.omApiSecret}`
    );

    const externalId = Date.now() + '-' + Math.round(Math.random() * 1e9);

    const res = await this.client.post<{
      status: string;
      message: string;
      external_id?: string;
      internal_id?: string;
    }>(
      'iwomipay',
      { ...credentials, country: 'CM', external_id: externalId },
      {
        headers: {
          authorization: 'Bearer ' + token,
          accountKey,
        },
      }
    );
    return res.data;
  }

  async check(internalId: string) {
    const { token } = await this.authenticate();

    const res = await this.client.get<{
      status: string;
      message: string;
      external_id: string;
      internal_id: string;
    }>('iwomipayStatus/' + internalId, {
      headers: {
        authorization: 'Bearer ' + token,
      },
    });
    return res.data;
  }
}

export const iwomiPay = new IwomiPay();
