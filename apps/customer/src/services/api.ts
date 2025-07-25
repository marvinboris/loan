import {
  authState$,
  formatPhoneNumber,
  getHttpClient,
} from '@creditwave/utils';

// Service pour les opérations d'authentification
export const authService = {
  login: async (credentials: { mobile: string }) => {
    const httpClient = getHttpClient();
    credentials.mobile = formatPhoneNumber(credentials.mobile);
    const response = await httpClient.post<{
      success: boolean;
      message: string;
    }>('/auth/customer', credentials);

    return { ...response, mobile: credentials.mobile };
  },

  logout: () => {
    const httpClient = getHttpClient();
    httpClient.removeAuthToken();
  },

  // Vérifier si l'utilisateur est connecté depuis l'état persisté
  isAuthenticated: () => {
    return authState$.isAuthenticated.get();
  },

  // Obtenir l'utilisateur actuel
  getCurrentUser: () => {
    return authState$.user.get();
  },

  verify: async (credentials: { mobile: string; code: string }) => {
    const httpClient = getHttpClient();
    const response = await httpClient.post<{ token: string; customer: any }>(
      '/auth/verify',
      credentials
    );

    // Après connexion réussie, ajouter le token et l'utilisateur à l'état
    if (response.token) {
      httpClient.setAuthToken(response.token, response.customer);
    }

    return response;
  },
};

export const beneficiaryService = {
  submit: async (credentials: {
    mobile: string;
    account: string;
    provider: string;
  }) => {
    const httpClient = getHttpClient();
    credentials.mobile = formatPhoneNumber(credentials.mobile);
    const response = await httpClient.post<{
      success: boolean;
      message: string;
    }>('/customer/beneficiary', credentials);

    return response;
  },

  verify: async (credentials: {
    mobile: string;
    account: string;
    code: string;
  }) => {
    const httpClient = getHttpClient();
    const response = await httpClient.post<{
      success: boolean;
      message: string;
    }>('/customer/beneficiary/verify', credentials);

    return response;
  },
};

export const kycService = {
  submit: async (credentials: {
    firstName?: string;
    lastName: string;
    location: string;
    birthdate: string;
    emergencyNumber1: string;
    emergencyNumber2?: string;
    frontPhoto: string;
    backPhoto: string;
    selfie: string;
  }) => {
    const httpClient = getHttpClient();
    const response = await httpClient.post<{
      success: boolean;
      message: string;
    }>('/customer/kyc', credentials);

    return response;
  },
};

export const borrowService = {
  submit: async (credentials: { amount: number; photo: string }) => {
    const httpClient = getHttpClient();
    const response = await httpClient.post<{
      success: boolean;
      message: string;
    }>('/customer/borrow', credentials);

    return response;
  },
};
