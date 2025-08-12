import { useConfig } from '@creditwave/hooks';
import { Button, Section, Typography } from '@creditwave/ui';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export default function Page() {
  const { t } = useTranslation();
  const { theme } = useConfig();

  return (
    <Section
      style={{ gap: 32, backgroundColor: theme.grey5, paddingVertical: 166 }}
    >
      <Typography style={{ fontSize: 72 }} family="BOLD" align="center">
        {t('kyc.completed')}
      </Typography>

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Button
          type="clear"
          title={t('kyc.dashboard')}
          containerStyle={{ flex: 1 }}
          onPress={() => router.push('/dashboard')}
        />

        <Button
          title={t('kyc.borrow')}
          containerStyle={{ flex: 1 }}
          onPress={() => router.push('/borrow')}
        />
      </View>
    </Section>
  );
}
