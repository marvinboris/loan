import i18n from 'i18next';
import moment from 'moment';
import { initReactI18next } from 'react-i18next';
import 'moment/locale/fr';
import { en, fr } from './translations';

export type i18nKey = keyof typeof en;

export const defaultNS = 'translation';
export const resources = {
  en: {
    translation: { ...en },
  },
  fr: {
    translation: { ...fr },
  },
} as const;

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  fallbackLng: 'en',
  defaultNS,
  resources,
});

// Listen for language changes and update moment locale
i18n.on('languageChanged', (lng) => {
  moment.locale(lng);
});

export { i18n };
