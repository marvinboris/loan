import { languageState$ } from '@creditwave/utils';
import React from 'react';
import { useTranslation } from 'react-i18next';

export function useLanguage() {
  const { i18n } = useTranslation();

  const [language, setLanguage] = React.useState(languageState$.get());

  languageState$.onChange(({ value }) => {
    setLanguage(value);
    i18n.changeLanguage(value);
  });

  return { language, setLanguage: languageState$.set };
}
