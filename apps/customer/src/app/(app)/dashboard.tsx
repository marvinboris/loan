import { useApi, useConfig, useTitle } from '@creditwave/hooks';
import { Button, Loan, LoanProps, Section } from '@creditwave/ui';
import { router } from 'expo-router';
import moment from 'moment';
import { View } from 'react-native';

const defaultData = [
  {
    amount: 5000,
    interest: 50,
    date: moment().subtract(2, 'd').toDate(),
    active: true,
  },
  {
    amount: 7000,
    interest: 70,
    date: moment().subtract(2, 'w').toDate(),
  },
];

export default function Page() {
  const { theme } = useConfig();
  useTitle('Dashboard');

  const { data, loading } = useApi<{ data: LoanProps[]; success: boolean }>(
    '/customer/dashboard'
  );

  return (
    <View style={{ gap: 10 }}>
      <View>
        <View style={{ paddingVertical: 12, paddingHorizontal: 16 }}>
          <View
            style={{
              height: 150,
              borderRadius: 6,
              backgroundColor: theme.primary + '22',
            }}
          />
        </View>

        <Button
          onPress={() => router.push('/borrow')}
          containerStyle={{ alignSelf: 'center' }}
        >
          Borrow now
        </Button>
      </View>

      <Section loading={loading} titleText="History">
        {(data?.data || defaultData).map((item, index) => (
          <Loan key={index} {...item} />
        ))}
      </Section>
    </View>
  );
}
