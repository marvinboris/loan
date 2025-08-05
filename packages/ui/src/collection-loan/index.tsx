import { useConfig } from '@creditwave/hooks';
import moment from 'moment';
import { Pressable, View } from 'react-native';
import { Typography } from '../typography';

export type CollectionLoanProps = {
  loanNumber: number;
  amount: number;
  productName: string;
  name: string;
  mobile: string;
  gender: string;
  reimbursementTime: string;
  date: string;
  total: number;
  realAmount: number;
  serviceFees: number;
  interest: number;
  penalty: number;
  lateDays: number;
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
      <Typography color="grey0">#{item.loanNumber}</Typography>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Typography family="BOLD">{item.name}</Typography>
          {item.lateDays ? (
            <Typography family="BOLD" size="sm">
              {item.lateDays}
            </Typography>
          ) : null}
        </View>

        <View>
          <Typography>{item.total.toLocaleString()} XAF</Typography>
          <Typography color="grey0" size="sm">
            {moment(item.date).format('LT')}
          </Typography>
        </View>
      </View>
    </Pressable>
  );
}
