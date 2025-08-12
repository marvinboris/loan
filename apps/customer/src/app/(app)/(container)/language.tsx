import { useConfig, useLanguage, useTitle } from '@creditwave/hooks';
import { Card, Section } from '@creditwave/ui';
import { LanguageState } from '@creditwave/utils';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

export default function Page() {
  const { t } = useTranslation();

  useTitle(t('language.title'));

  return (
    <ScrollView>
      <Section bodyStyle={{ gap: 8 }} subtitleText={t('language.subtitle')}>
        {Object.entries({
          en: ['English', t('language.en')],
          fr: ['Français', t('language.fr')],
        }).map(([abbr, [title, description]], index) => (
          <Language
            key={index}
            title={title}
            description={description}
            abbr={abbr as LanguageState}
          />
        ))}
      </Section>
    </ScrollView>
  );
}

function Language({
  abbr,
  title,
  description,
}: {
  abbr: LanguageState;
  title: string;
  description: string;
}) {
  const { language, setLanguage } = useLanguage();

  const { theme } = useConfig();

  const active = abbr === language;

  return (
    <Card
      onPress={() => setLanguage(abbr)}
      title={title}
      subtitleText={description}
      style={active && { backgroundColor: theme.primary }}
      titleProps={{ textStyle: { color: active ? theme.white : undefined } }}
      subtitleProps={{
        textStyle: { color: active ? theme.white : undefined },
      }}
    />
  );
}
