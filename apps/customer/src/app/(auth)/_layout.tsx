import { useAuth } from '@creditwave/hooks';
import { Card, Logo } from '@creditwave/ui';
import { router, Slot } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function Layout() {
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) router.navigate('/dashboard');
  }, [isAuthenticated]);

  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        paddingTop: 40,
        paddingBottom: 20,
      }}
    >
      <Logo />

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Card style={{ width: 320, padding: 24 }}>
          <Slot />
        </Card>
      </View>
    </View>
  );
}
