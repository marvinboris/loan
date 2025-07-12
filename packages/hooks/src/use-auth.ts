import { authState$ } from '@creditwave/utils';
import { useObservable, useObserve } from '@legendapp/state/react';
import React from 'react';

export const useAuth = () => {
  const auth = useObservable(authState$);

  const [token, setToken] = React.useState(auth.token.get());
  const [user, setUser] = React.useState(auth.user.get());
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    auth.isAuthenticated.get()
  );

  useObserve(auth.token, () => setToken(auth.token.get()));
  useObserve(auth.user, () => setUser(auth.user.get()));
  useObserve(auth.isAuthenticated, () =>
    setIsAuthenticated(auth.isAuthenticated.get())
  );

  return {
    token,
    user,
    isAuthenticated,
    // Actions
    setAuth: (token: string, user?: any) => {
      authState$.token.set(token);
      authState$.user.set(user);
      authState$.isAuthenticated.set(true);
    },
    logout: () => {
      authState$.token.set(null);
      authState$.user.set(null);
      authState$.isAuthenticated.set(false);
    },
  };
};
