import { Image } from 'react-native';

export function Logo() {
  return (
    <Image
      source={{
        height: 36,
        uri: '/logo.png',
      }}
    />
  );
}
