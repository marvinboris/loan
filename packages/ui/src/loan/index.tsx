import { useConfig } from '@creditwave/hooks';
import moment from 'moment';
import { Pressable, View } from 'react-native';
import { Typography } from '../typography';

export type LoanProps = {
  amount: number;
  interest: number;
  date: Date;
  active?: boolean;
};

export function Loan(item: LoanProps) {
  const { theme } = useConfig();

  return (
    <Pressable
      style={({ pressed }) => [
        {
          gap: 4,
          paddingVertical: 12,
          paddingHorizontal: 12,
          marginHorizontal: -12,
        },
        pressed && { backgroundColor: theme.primary + '22' },
      ]}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography color={item.active ? 'warning' : 'success'}>
          {item.amount} XAF
        </Typography>

        <Typography color="black">+{item.interest}</Typography>
      </View>

      <Typography color="grey0">{moment(item.date).fromNow()}</Typography>
    </Pressable>
  );
}
