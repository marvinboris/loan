import axios, { AxiosError, AxiosInstance } from 'axios';
import { config } from '../config';

interface AirtimeInput {
  amount: number;
  api_key: string;
  destination: string;
  ipn_url: string;
  service_id: number;
  om_otp?: string;
  custom_data: string;
}

interface AirtimeCredentials {
  destination: string;
  amount: number;
  type: 'momo' | 'om';
  op_type: 'cashin' | 'cashout';
}

interface AirtimeResponse {
  data: {
    transaction_id: string;
    amount: number;
    benefice: number;
    comission: number;
    destination: string;
    fee: string;
    response: null;
    service_id: number;
    customer_name: string;
    state: State;
    custom_data?: string;
    ipn_url: string;
    transaction_channel: null;
    provider_id: null;
    sms_link: null;
    p_id: string;
    p_last_wallet_amount: number;
    p_new_wallet_amount: null;
    created_at: string;
    updated_at: string;
  };
  message: string;
  statut_code: 200 | 500;
}

interface StatusInput {
  api_key: string;
  transaction_ids: string;
}

type State = 'SUCCESSFUL' | 'FAILED' | 'PENDING1' | 'PENDING';

interface IpnResponse {
  transaction_id: string;
  amount: number;
  benefice: number;
  comission: number;
  destination: string;
  fee: number;
  response: string;
  error?: string;
  service_id: number;
  customer_name: string;
  state: State;
  custom_data?: string;
  ipn_url: string;
  provider_id: null;
  sms_link: number;
  created_at: string;
  updated_at: string;
  ipn_state: number;
  w_amount_after_transaction: string;
  p_last_wallet_amount: number;
  p_new_wallet_amount: null;
  p_id: string;
  hash: string;
}

interface StatusResponse {
  data: {
    transaction_id: string;
    amount: number;
    benefice: number;
    comission: number;
    destination: string;
    fee: number;
    error?: string;
    service_id: number;
    customer_name: string;
    state: State;
    custom_data?: string;
    ipn_url: string;
    provider_id: null;
    created_at: string;
    updated_at: string;
    p_last_wallet_amount: string;
    p_new_wallet_amount: null;
    p_id: number;
    hash: null;
  };
  message: string;
  statut_code: 200 | 500;
}

class PixPay {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.pixPay.url,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private getServiceId(
    type: 'momo' | 'om',
    op_type: 'cashin' | 'cashout'
  ): number {
    return config.pixPay.serviceIds[type][op_type];
  }

  private generateExternalId(): string {
    return `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  }

  async airtime(credentials: AirtimeCredentials) {
    const externalId = this.generateExternalId();

    const input: AirtimeInput = {
      amount: credentials.amount,
      destination: credentials.destination,
      api_key: config.pixPay.key,
      ipn_url: 'http://localhost',
      custom_data: JSON.stringify({ externalId }),
      service_id: this.getServiceId(credentials.type, credentials.op_type),
    };
    const res = await this.client.post<AirtimeResponse>('airtime', input);

    return res.data;
  }

  async status(transactionId: string) {
    const input: StatusInput = {
      api_key: config.pixPay.key,
      transaction_ids: transactionId,
    };
    const res = await this.client.post<StatusResponse>('status', input);

    return res.data;
  }
}

export const pixPay = new PixPay();

export const pixpayCash =
  (type: 'momo' | 'om', op_type: 'cashin' | 'cashout') =>
  async (tel: string, amount: number, debug?: boolean) => {
    const destination = tel.substring(3);

    try {
      const result = await pixPay.airtime({
        type,
        destination,
        op_type,
        amount,
      });
      if (debug) console.log(result);
      if (result.statut_code === 500) return false;

      let status = result.data.state;

      if (op_type === 'cashin')
        return status === 'FAILED'
          ? undefined
          : JSON.parse(result.data.custom_data).externalId;

      while (status === 'PENDING1' || status === 'PENDING') {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        const res = await pixPay.status(result.data.transaction_id);
        if (debug) console.log(res);
        status = res.data.state;
      }

      if (debug) {
        console.log(status);
        return status;
      }

      return status === 'SUCCESSFUL'
        ? JSON.parse(result.data.custom_data).externalId
        : undefined;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };
