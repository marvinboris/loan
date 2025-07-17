import { useConfig } from '@creditwave/hooks';

import { Card, CardProps } from '../card';
import { UserIcon } from 'react-native-heroicons/outline';

export function Picture({
  size = 64,
  style,
  ...props
}: Omit<CardProps, 'size'> & { size?: number }) {
  const { theme } = useConfig();

  return (
    <Card
      size="sm"
      style={[
        {
          backgroundColor: theme.white,
          width: size,
          height: size,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}
      {...props}
    >
      <UserIcon color={theme.secondary} size={size - 12} />
    </Card>
  );
}
