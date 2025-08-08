import axios, { AxiosInstance } from 'axios';
import { config } from '../config';

interface AuthResponse {
  status: string;
  message: string;
  token?: string;
}

interface PaymentResponse {
  status: string;
  message: string;
  external_id?: string;
  internal_id?: string;
}

interface StatusResponse {
  status: string;
  message: string;
  external_id: string;
  internal_id: string;
}

interface PaymentCredentials {
  amount: string;
  motif: string;
  tel: string;
  op_type: 'debit' | 'credit';
  type: 'momo' | 'om';
}

interface TokenCache {
  token: string;
  expiresAt: number;
}

class IwomiPay {
  private client: AxiosInstance;
  private tokenCache: TokenCache | null = null;
  private readonly TOKEN_VALIDITY_SECONDS = 300;
  private readonly TOKEN_BUFFER_SECONDS = 30; // Renouveler 30s avant expiration pour éviter les erreurs

  constructor() {
    this.client = axios.create({
      baseURL: config.iwomiPay.url,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private isTokenValid(): boolean {
    if (!this.tokenCache) {
      return false;
    }

    const now = Date.now();
    const tokenExpiryWithBuffer =
      this.tokenCache.expiresAt - this.TOKEN_BUFFER_SECONDS * 1000;

    return now < tokenExpiryWithBuffer;
  }

  private async authenticate(): Promise<string> {
    // Vérifier si le token en cache est encore valide
    if (this.isTokenValid() && this.tokenCache) {
      return this.tokenCache.token;
    }

    try {
      const res = await this.client.post<AuthResponse>('authenticate', {
        username: config.iwomiPay.username,
        password: config.iwomiPay.password,
      });

      if (!res.data.token) {
        throw new Error('No token received from authentication');
      }

      // Mettre en cache le token avec sa date d'expiration
      this.tokenCache = {
        token: res.data.token,
        expiresAt: Date.now() + this.TOKEN_VALIDITY_SECONDS * 1000,
      };

      return res.data.token;
    } catch (error) {
      // Invalider le cache en cas d'erreur
      this.tokenCache = null;
      throw error;
    }
  }

  private getAccountKey(type: 'momo' | 'om'): string {
    return type === 'momo'
      ? btoa(`${config.iwomiPay.momoApiKey}:${config.iwomiPay.momoApiSecret}`)
      : btoa(`${config.iwomiPay.omApiKey}:${config.iwomiPay.omApiSecret}`);
  }

  private generateExternalId(): string {
    return `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  }

  async payment(credentials: PaymentCredentials): Promise<PaymentResponse> {
    const token = await this.authenticate();
    const accountKey = this.getAccountKey(credentials.type);
    const externalId = this.generateExternalId();

    try {
      const res = await this.client.post<PaymentResponse>(
        'iwomipay',
        {
          ...credentials,
          country: 'CM',
          external_id: externalId,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            accountKey,
          },
        }
      );

      return res.data;
    } catch (error) {
      // Si l'erreur est liée à l'authentification, invalider le cache
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        this.tokenCache = null;
      }
      throw error;
    }
  }

  async check(internalId: string): Promise<StatusResponse> {
    const token = await this.authenticate();

    try {
      const res = await this.client.get<StatusResponse>(
        `iwomipayStatus/${internalId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      // Si l'erreur est liée à l'authentification, invalider le cache
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        this.tokenCache = null;
      }
      throw error;
    }
  }

  // Méthode utilitaire pour forcer le renouvellement du token si nécessaire
  async refreshToken(): Promise<void> {
    this.tokenCache = null;
    await this.authenticate();
  }

  // Méthode utilitaire pour vérifier l'état du cache
  getTokenCacheInfo(): { isValid: boolean; expiresIn?: number } {
    if (!this.tokenCache) {
      return { isValid: false };
    }

    const now = Date.now();
    const expiresIn = Math.max(
      0,
      Math.floor((this.tokenCache.expiresAt - now) / 1000)
    );

    return {
      isValid: this.isTokenValid(),
      expiresIn,
    };
  }
}

export const iwomiPay = new IwomiPay();
