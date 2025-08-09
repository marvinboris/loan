import { useApi, useConfig, useTitle } from '@creditwave/hooks';
import { Button, Loan, LoanType, Section, Typography } from '@creditwave/ui';
import { router } from 'expo-router';
import { RefreshControl, ScrollView, View } from 'react-native';
import { repaymentService } from '../../../services';

export default function Page() {
  const { theme } = useConfig();
  useTitle('Dashboard');

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
            Loan validation pending...
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
            Your loan application was validated. Repay before requesting a new
            one.
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
                Stuck and need to make a little quick mobile payment ?
              </Typography>
            </View>

            <Button
              onPress={() => router.push('/borrow')}
              containerStyle={{ alignSelf: 'center' }}
            >
              Borrow now
            </Button>
          </View>
        )}

        <Section loading={loading} titleText="History">
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
