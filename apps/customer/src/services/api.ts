import { authState$, getHttpClient } from '@creditwave/utils';

// Service pour les opérations d'authentification
export const authService = {
  login: async (credentials: { phone: string }) => {
    const httpClient = getHttpClient();
    const response = await httpClient.post<{ login: string }>(
      '/auth/customer',
      credentials
    );

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

  verify: async (credentials: { code: string }) => {
    const httpClient = getHttpClient();
    const response = await httpClient.post<{ token: string; user: any }>(
      '/auth/verify',
      credentials
    );

    // Après connexion réussie, ajouter le token et l'utilisateur à l'état
    if (response.token) {
      httpClient.setAuthToken(response.token, response.user);
    }

    return response;
  },
};
