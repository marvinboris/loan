import { useConfig } from '@creditwave/hooks';
import { Button, Section, Typography } from '@creditwave/ui';
import { router } from 'expo-router';

export default function Page() {
  const { theme } = useConfig();

  return (
    <Section
      style={{ gap: 32, backgroundColor: theme.grey5, paddingVertical: 166 }}
    >
      <Typography style={{ fontSize: 72 }} family="BOLD" align="center">
        KYC Completed
      </Typography>

      <Button
        title="Dashboard"
        onPress={() => router.push('/dashboard')}
        containerStyle={{ alignItems: 'center' }}
      />
    </Section>
  );
}
