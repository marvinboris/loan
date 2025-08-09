import { useConfig } from '@creditwave/hooks';
import React from 'react';
import { Image } from 'react-native';
import { Card, CardProps } from '../card';

export function Picture({
  style,
  uri,
  ...props
}: Omit<CardProps, 'children' | 'size'> & { uri?: string }) {
  const { theme } = useConfig();
  const [height, setHeight] = React.useState(0);
  const [width, setWidth] = React.useState(0);

  const execute = React.useCallback(async () => {
    if (!uri) return;
    const size = await Image.getSize(uri);
    return setHeight((size.height * width) / size.width);
  }, [uri, width]);

  React.useEffect(() => {
    execute();
  }, [execute]);

  return (
    <Card
      size="sm"
      style={[
        {
          backgroundColor: theme.white,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}
      {...props}
    >
      <Image
        source={{ uri, height }}
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      />
    </Card>
  );
}
