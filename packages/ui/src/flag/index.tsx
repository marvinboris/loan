import { CountryIso2 } from '@creditwave/utils';
import { StyleProp, View, ViewStyle } from 'react-native';
import flags from './flags';

export type FlagProps = {
  ratio?: '1x1' | '4x3';
  size?: number;
  country: CountryIso2;
  style?: StyleProp<ViewStyle>;
};

export function Flag({
  country,
  ratio = '4x3',
  size = 24,
  style,
  ...props
}: FlagProps) {
  if (!(country?.toLowerCase() in flags[ratio])) return null;

  const FlagComponent =
    flags[ratio][country.toLowerCase() as keyof (typeof flags)['1x1']];

  return (
    <View style={[{ width: size, height: size }, style]}>
      <FlagComponent width={size} height={size} {...props} />
    </View>
  );
}
