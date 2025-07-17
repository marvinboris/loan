import { useApi } from '@creditwave/hooks';
import { Button, Section, Typography } from '@creditwave/ui';
import moment from 'moment';
import { View } from 'react-native';

type Item = {
  amount: number;
  interest: number;
  date: Date;
  active?: boolean;
};

export default function Page() {
  const {
    data = [
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
    ],
    loading,
  } = useApi<Item[]>('/customer/dashboard');

  return (
    <View style={{ gap: 10 }}>
      <View>
        <Typography align="center">Onboarding</Typography>

        <Button containerStyle={{ alignSelf: 'center' }}>Borrow now</Button>
      </View>

      <Section loading={loading} size="xs" titleText="History">
        {data.map((item, index) => (
          <View key={index}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Typography color={item.active ? 'warning' : 'success'}>
                {item.amount} XAF
              </Typography>

              <Typography color="black">+{item.interest}</Typography>
            </View>

            <Typography color="disabled">
              {moment(item.date).fromNow()}
            </Typography>
          </View>
        ))}
      </Section>
    </View>
  );
}
