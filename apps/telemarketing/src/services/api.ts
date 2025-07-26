import { authState$, getHttpClient } from '@creditwave/utils';

type Response = { message: string; success: boolean };

// Service pour les opérations d'authentification
export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    const httpClient = getHttpClient();
    const response = await httpClient.post<{ token: string; user: any }>(
      '/auth/login',
      credentials
    );

    // Après connexion réussie, ajouter le token et l'utilisateur à l'état
    if (response.token) {
      httpClient.setAuthToken(response.token, response.user);
    }

    return response;
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

  changePassword: async (credentials: {
    oldPassword: string;
    password: string;
    passwordConfirmation: string;
  }) => {
    const httpClient = getHttpClient();
    const response = await httpClient.post<Response>(
      '/auth/change-password',
      credentials
    );

    return response;
  },
};

// Service pour le telemarketing
export const telemarketingService = {
  dataImport: (type: 'new' | 'old' | 'registered') => async (file: any) => {
    const httpClient = getHttpClient();
    const results = await httpClient.post<Response>(
      '/admin/telemarketing/' +
        {
          new: 'new-customers',
          old: 'old-customers',
          registered: 'registered-customers',
        }[type] +
        '/import',
      file,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return results;
  },
};
