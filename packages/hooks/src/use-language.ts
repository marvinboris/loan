import { i18n, languageState$ } from '@creditwave/utils';

export function useLanguage() {
  const language = languageState$.get();
  const setLanguage = languageState$.set;
  languageState$.onChange((language) => i18n.changeLanguage(language.value));

  return { language, setLanguage };
}
