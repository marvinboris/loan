import { View } from 'react-native';
import { Typography } from '../typography';

export type TextLineProps = {
  label: string;
  value: string;
  bold?: boolean;
};

export function TextLine({ label, value, bold }: TextLineProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
      }}
    >
      <Typography family={bold ? 'BOLD' : undefined}>{label}</Typography>

      <Typography family="BOLD">{value}</Typography>
    </View>
  );
}
