import { Slot } from 'expo-router';
import { ScrollView } from 'react-native';

export default function Layout() {
  return (
    <ScrollView>
      <Slot />
    </ScrollView>
  );
}
