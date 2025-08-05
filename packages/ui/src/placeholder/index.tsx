import { View, ViewProps } from 'react-native';
import { TvIcon } from 'react-native-heroicons/outline';
import { Typography } from '../typography';
import { Card } from '../card';

export type PlaceholderProps = ViewProps & {
  size?: 'sm' | 'md' | 'lg';
  icons?: (typeof TvIcon)[];
  text?: string;
  bordered?: boolean;
};

export function Placeholder({
  id,
  icons,
  bordered,
  size = 'md',
  style,
  text = 'No data',
  ...props
}: PlaceholderProps) {
  const gap = {
    sm: 0,
    md: 4,
    lg: 12,
  }[size];

  const fontSize = {
    sm: 14,
    md: 16,
    lg: 20,
  }[size];

  const iconSize = {
    sm: 24,
    md: 40,
    lg: 60,
  }[size];

  const children = (
    <>
      {icons?.length ? (
        <View style={{ flexDirection: 'row', gap, opacity: 0.5 }}>
          {icons.map((Icon, index) => (
            <Icon
              size={iconSize}
              id={id + '-icon-' + index}
              key={id + '-icon-' + index}
            />
          ))}
        </View>
      ) : null}

      <Typography
        style={{
          fontSize,
          fontFamily: 'ITALIC',
          opacity: 0.5,
        }}
      >
        {text}
      </Typography>
    </>
  );

  return bordered ? (
    <Card
      id={id}
      {...props}
      style={[{ gap, alignItems: 'center', justifyContent: 'center' }, style]}
    >
      {children}
    </Card>
  ) : (
    <View
      id={id}
      style={[{ gap, alignItems: 'center', justifyContent: 'center' }, style]}
      {...props}
    >
      {children}
    </View>
  );
}
