import { useAuth } from '@creditwave/hooks';
import { router } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Page() {
  const { isAuthenticated } = useAuth();
  const [appIsReady, setAppIsReady] = React.useState(false);

  React.useEffect(() => {
    async function prepare() {
      try {
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 1));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  React.useEffect(() => {
    if (appIsReady) {
      if (isAuthenticated) router.push('/dashboard');
      else router.push('/login');
    }
  }, [isAuthenticated, appIsReady]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
