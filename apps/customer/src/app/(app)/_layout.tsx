import { useConfig } from '@creditwave/hooks';
import { Typography } from '@creditwave/ui';
import { Slot } from 'expo-router';
import { View } from 'react-native';
import { Bars3Icon } from 'react-native-heroicons/outline';

export default function Layout() {
  const { theme } = useConfig();

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Bars3Icon />

        <Typography style={{ flex: 1 }}>Dashboard</Typography>

        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 9999,
            backgroundColor: theme.primary + '22',
          }}
        />
      </View>

      <Slot />
    </View>
  );
}
