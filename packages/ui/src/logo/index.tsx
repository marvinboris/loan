import { Image, View } from 'react-native';

export function Logo() {
  return (
    <View style={{ width: '100%' }}>
      <Image
        style={{ width: 222, height: 36, alignSelf: 'center' }}
        source={require('./logo.png')}
      />
    </View>
  );
}
