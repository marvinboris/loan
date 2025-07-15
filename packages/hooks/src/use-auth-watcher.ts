import React from 'react';
import { useAuth } from './use-auth';

// Hook pour surveiller les changements d'état d'authentification
export const useAuthWatcher = () => {
  const { isAuthenticated, user } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated && user) {
      console.log('User connected:', user);
      // Logique à exécuter lors de la connexion
    } else {
      console.log('User disconnected');
      // Logique à exécuter lors de la déconnexion
    }
  }, [isAuthenticated, user]);
};
