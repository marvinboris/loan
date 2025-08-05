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

// Service pour la collection
export const collectionService = {
  addMark: async (
    id: string,
    credentials: {
      connection: string;
      willingnessToPay: string;
      location: string;
      contactTarget: string;
      collectionResult: string;
      remark: string;
    }
  ) => {
    const httpClient = getHttpClient();
    const result = await httpClient.post<Response>(
      '/collection/' + id + '/mark',
      credentials
    );

    return result;
  },
};
