import { observable } from '@legendapp/state';
import { observablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage';
import { ObservablePersistLocalStorage } from '@legendapp/state/persist-plugins/local-storage';
import { syncObservable } from '@legendapp/state/sync';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const plugin =
  Platform.OS === 'web'
    ? ObservablePersistLocalStorage
    : observablePersistAsyncStorage({
        AsyncStorage,
      });

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

// Interface pour l'etat du formulaire KYC
export interface KycState {
  firstName?: string;
  lastName: string;
  location: string;
  birthdate: string;
  emergencyNumber1: string;
  emergencyNumber1Name: string;
  emergencyNumber2?: string;
  emergencyNumber2Name?: string;
  frontPhoto: string;
  backPhoto: string;
  selfie: string;
}

export type LanguageState = 'en' | 'fr';

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

// Etat du titre de la page
export const titleState$ = observable<string>('');

// Etat du formulaire KYC
export const kycState$ = observable<KycState>();

export const languageState$ = observable<LanguageState>('en');

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

syncObservable(kycState$, {
  persist: {
    name: 'kyc-state',
    plugin,
  },
});

syncObservable(languageState$, {
  persist: {
    name: 'language-state',
    plugin,
  },
});
