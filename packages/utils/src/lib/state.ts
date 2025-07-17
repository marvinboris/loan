import { observable } from '@legendapp/state';
import { ObservablePersistLocalStorage } from '@legendapp/state/persist-plugins/local-storage';
import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv';
import { syncObservable } from '@legendapp/state/sync';
import { Platform } from 'react-native';

const plugin =
  Platform.OS === 'web' ? ObservablePersistLocalStorage : ObservablePersistMMKV;

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

// Interface pour l'état de la première utilisation
export type IsFirstUseState = boolean;

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

// État de la première utilisation
export const isFirstUseState$ = observable<IsFirstUseState>(false);

// Configuration de la persistance pour l'authentification
syncObservable(authState$, {
  persist: {
    name: 'auth-state',
    plugin,
  },
});

syncObservable(isFirstUseState$, {
  persist: {
    name: 'is-first-use-state',
    plugin,
  },
});
