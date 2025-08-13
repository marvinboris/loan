import { useConfig } from '@creditwave/hooks';
import { Loan } from '@creditwave/types';
import moment from 'moment';
import { Pressable, View } from 'react-native';
import { Typography } from '../typography';

export type CollectionLoanProps = Loan & {
  name: string;
  collection_records?: [];
};

export function CollectionLoan({
  onPress,
  ...item
}: CollectionLoanProps & { onPress: (item: CollectionLoanProps) => void }) {
  const { theme } = useConfig();

  const qty = item.collection_records?.length || 0;
  const color =
    qty === 0
      ? undefined
      : qty === 1
      ? theme.primary
      : qty === 2
      ? theme.warning
      : theme.success;

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
        qty
          ? { backgroundColor: color }
          : pressed && { backgroundColor: theme.primary + '22' },
      ]}
    >
      <Typography color={qty ? 'white' : 'grey0'}>
        #{item.loan_number}
      </Typography>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Typography color={qty ? 'white' : undefined} family="BOLD">
            {item.name}
          </Typography>
          {item.days_overdue ? (
            <Typography
              color={qty ? 'white' : undefined}
              family="BOLD"
              size="sm"
            >
              {item.days_overdue}
            </Typography>
          ) : null}
        </View>

        <View>
          <Typography color={qty ? 'white' : undefined} align="right">
            {item.total_repayment?.toLocaleString()} XAF
          </Typography>
          <Typography color={qty ? 'white' : 'grey0'} size="sm" align="right">
            {moment(item.created_at).format('LL')}
          </Typography>
        </View>
      </View>
    </Pressable>
  );
}
