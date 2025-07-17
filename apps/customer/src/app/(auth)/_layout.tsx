import { Card, Logo } from '@creditwave/ui';
import { Slot } from 'expo-router';
import { View } from 'react-native';

export default function Layout() {
  return (
    <View style={{ alignItems: 'center' }}>
      <Logo />

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Card>
          <Slot />
        </Card>
      </View>
    </View>
  );
}
