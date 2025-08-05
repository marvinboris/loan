import { useConfig } from '@creditwave/hooks';
import moment from 'moment';
import { Pressable, View } from 'react-native';
import { Typography } from '../typography';

export type CollectionLoanProps = {
  loan_number: number;
  loan_amount: number;
  product_name: string;
  name: string;
  mobile: string;
  gender: string;
  due_date: string;
  created_at: string;
  total_repayment: number;
  real_amount: number;
  service_fees: number;
  interest: number;
  penalty: number;
  days_overdue: number;
};

export function CollectionLoan({
  onPress,
  ...item
}: CollectionLoanProps & { onPress: (item: CollectionLoanProps) => void }) {
  const { theme } = useConfig();

  return (
    <Pressable
      onPress={() => onPress(item)}
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
      <Typography color="grey0">#{item.loan_number}</Typography>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Typography family="BOLD">{item.name}</Typography>
          {item.days_overdue ? (
            <Typography family="BOLD" size="sm">
              {item.days_overdue}
            </Typography>
          ) : null}
        </View>

        <View>
          <Typography>{item.total_repayment?.toLocaleString()} XAF</Typography>
          <Typography color="grey0" size="sm" align="right">
            {moment(item.created_at).format('LL')}
          </Typography>
        </View>
      </View>
    </Pressable>
  );
}
