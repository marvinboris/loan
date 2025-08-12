import { useApi, useConfig, useTitle } from '@creditwave/hooks';
import { Button, Loan, LoanType, Section, Typography } from '@creditwave/ui';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView, View } from 'react-native';
import { repaymentService } from '../../../services';

export default function Page() {
  const { t } = useTranslation();

  const { theme } = useConfig();
  useTitle(t('dashboard.title'));

  const { data, loading, refetch } = useApi<{
    data: LoanType[];
    pending: boolean;
    accepted: boolean;
    success: boolean;
  }>('/customer/dashboard');

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refetch} />
      }
    >
      <View style={{ gap: 10 }}>
        {loading ? null : data?.pending ? (
          <Typography
            size="xl"
            align="center"
            color="warning"
            family="SEMIBOLD"
            style={{
              backgroundColor: theme.warning + '22',
              padding: 12,
              borderRadius: 6,
            }}
          >
            {t('dashboard.pending')}
          </Typography>
        ) : data?.accepted ? (
          <Typography
            size="xl"
            align="center"
            color="secondary"
            family="SEMIBOLD"
            style={{
              backgroundColor: theme.secondary + '22',
              padding: 12,
              borderRadius: 6,
            }}
          >
            {t('dashboard.accepted')}
          </Typography>
        ) : (
          <View>
            <View
              style={{
                borderRadius: 6,
                marginVertical: 12,
                paddingVertical: 12,
                marginHorizontal: 16,
                paddingHorizontal: 16,
                backgroundColor: theme.primary + '22',
              }}
            >
              <Typography size="xl" color="primary">
                {t('dashboard.stuck')}
              </Typography>
            </View>

            <Button
              onPress={() => router.push('/borrow')}
              containerStyle={{ alignSelf: 'center' }}
            >
              {t('dashboard.borrow')}
            </Button>
          </View>
        )}

        <Section loading={loading} titleText={t('dashboard.history')}>
          {data?.data?.map((item, index) => (
            <Loan
              key={index}
              {...item}
              onSubmit={async (data) => {
                const result = await repaymentService.submit(data);
                if (result.success) refetch();
                return result;
              }}
            />
          ))}
        </Section>
      </View>
    </ScrollView>
  );
}
