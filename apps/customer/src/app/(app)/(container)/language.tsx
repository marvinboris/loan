import { useConfig, useTitle } from '@creditwave/hooks';
import { Card, Section } from '@creditwave/ui';
import { Pressable, ScrollView } from 'react-native';

export default function Page() {
  useTitle('Language');

  return (
    <ScrollView>
      <Section
        bodyStyle={{ gap: 8 }}
        subtitleText="Please select your preferred display language for the application."
      >
        {Object.entries({
          en: [
            'English',
            'See all the application written in english language',
          ],
          fr: [
            'Français',
            'See all the application text written in french language',
          ],
        }).map(([abbr, [title, description]], index) => (
          <Language
            key={index}
            abbr={abbr}
            title={title}
            description={description}
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
  abbr: string;
  title: string;
  description: string;
}) {
  const { theme } = useConfig();

  const active = abbr === 'en';

  return (
    <Pressable>
      <Card
        title={title}
        subtitleText={description}
        style={active && { backgroundColor: theme.primary }}
        titleProps={{ textStyle: { color: active ? theme.white : undefined } }}
        subtitleProps={{
          textStyle: { color: active ? theme.white : undefined },
        }}
      />
    </Pressable>
  );
}
