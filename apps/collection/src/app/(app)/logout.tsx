import { router } from 'expo-router';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { authService } from '../../services';

export default function Logout() {
  React.useEffect(() => {
    authService.logout();
    router.push('/login');
  }, []);

  return <ActivityIndicator />;
}
