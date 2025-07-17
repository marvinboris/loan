import { useConfig } from '@creditwave/hooks';
import { Text, TextProps, TextStyle } from 'react-native';

export type TypographyProps = TextProps & {
  underline?: boolean;
  align?: TextStyle['textAlign'];
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  family?: 'REGULAR' | 'MEDIUM' | 'SEMIBOLD' | 'BOLD' | 'ITALIC';
  color?:
    | 'primary'
    | 'secondary'
    | 'warning'
    | 'error'
    | 'success'
    | 'black'
    | 'white'
    | 'disabled'
    | 'grey0'
    | 'grey1'
    | 'grey2'
    | 'grey3'
    | 'grey4'
    | 'grey5';
};

export function Typography({
  align,
  size = 'md',
  family = 'REGULAR',
  color,
  style,
  underline,
  ...props
}: TypographyProps) {
  const { getColor } = useConfig();

  return (
    <Text
      style={[
        {
          textAlign: align,
          fontSize: {
            sm: 16,
            md: 18,
            lg: 20,
            xl: 24,
            '2xl': 32,
          }[size],
          fontFamily: family,
          color: color ? getColor(color) : getColor('black'),
        },
        underline && { textDecorationLine: 'underline' },
        style,
      ]}
      {...props}
    />
  );
}
