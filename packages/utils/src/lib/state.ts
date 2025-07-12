import { observable } from '@legendapp/state';
import { syncObservable } from '@legendapp/state/sync';
import { ObservablePersistLocalStorage } from '@legendapp/state/persist-plugins/local-storage';

// Interface pour l'état de l'authentification
export interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
}

// Interface pour l'état des requêtes
export interface RequestState {
  loading: boolean;
  error: string | null;
}

// État global observable avec persistance
export const authState$ = observable<AuthState>({
  token: null,
  user: null,
  isAuthenticated: false,
});

// État des requêtes (non persisté)
export const requestState$ = observable<RequestState>({
  loading: false,
  error: null,
});

// Configuration de la persistance pour l'authentification
syncObservable(authState$, {
  persist: {
    name: 'auth-state',
    plugin: ObservablePersistLocalStorage,
  },
});
