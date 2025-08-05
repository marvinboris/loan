import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { authState$, requestState$ } from './state';

export interface HttpClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(config: HttpClientConfig) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    this.setupInterceptors();
    this.initializeAuthFromState();
  }

  private initializeAuthFromState() {
    // Restaurer le token depuis l'état persisté
    const token = authState$.token.get();
    if (token) {
      this.axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token}`;
    }
  }

  private setupInterceptors() {
    // Intercepteur de requête
    this.axiosInstance.interceptors.request.use(
      (config) => {
        requestState$.loading.set(true);
        requestState$.error.set(null);
        console.log('Request sent:', config);
        return config;
      },
      (error) => {
        requestState$.loading.set(false);
        requestState$.error.set(error.message);
        return Promise.reject(error);
      }
    );

    // Intercepteur de réponse
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        requestState$.loading.set(false);
        return response;
      },
      (error) => {
        requestState$.loading.set(false);

        // Gérer les erreurs d'authentification
        if (error.response?.status === 401) {
          this.handleAuthError();
        }

        const errorMessage =
          error.response?.data?.errors?.map((error) => error.msg)?.join('\n') ||
          error.response?.data?.message ||
          error.message ||
          'An error occured';
        requestState$.error.set(errorMessage);
        console.error('Response error:', errorMessage);
        return Promise.reject(error);
      }
    );
  }

  private handleAuthError() {
    // Réinitialiser l'état d'authentification
    authState$.token.set(null);
    authState$.user.set(null);
    authState$.isAuthenticated.set(false);
    this.removeAuthToken();
  }

  // Méthodes pour modifier les headers avec mise à jour de l'état
  setAuthToken(token: string, user?: any) {
    this.axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token}`;
    authState$.token.set(token);
    authState$.isAuthenticated.set(true);
    if (user) {
      authState$.user.set(user);
    }
  }

  removeAuthToken() {
    delete this.axiosInstance.defaults.headers.common['Authorization'];
    authState$.token.set(null);
    authState$.user.set(null);
    authState$.isAuthenticated.set(false);
  }

  setHeader(key: string, value: string) {
    this.axiosInstance.defaults.headers.common[key] = value;
  }

  removeHeader(key: string) {
    delete this.axiosInstance.defaults.headers.common[key];
  }

  // Méthodes HTTP
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }

  // Getter pour accéder à l'instance axios si nécessaire
  get instance(): AxiosInstance {
    return this.axiosInstance;
  }
}

// Singleton pour l'instance globale
let httpClientInstance: HttpClient | null = null;

export const createHttpClient = (config: HttpClientConfig): HttpClient => {
  httpClientInstance = new HttpClient(config);
  return httpClientInstance;
};

export const getHttpClient = (): HttpClient => {
  if (!httpClientInstance) {
    throw new Error(
      'HttpClient not initialized. Call initializeHttpClient first.'
    );
  }
  return httpClientInstance;
};

export const initializeHttpClient = (apiUrl: string) => {
  return createHttpClient({
    baseURL: apiUrl,
    timeout: 15000,
    headers: {
      Accept: 'application/json',
    },
  });
};
