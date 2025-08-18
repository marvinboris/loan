import {
  useAuthWatcher,
  useConfig,
  useIsFirstUse,
  useLanguage,
  useRequest,
} from '@creditwave/hooks';
import { Onboarding, Toast, toastShow } from '@creditwave/ui';
import { i18n, initializeHttpClient, languageState$ } from '@creditwave/utils';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export default function Layout() {
  return (
    <>
      <Bar />
      <Content />
    </>
  );
}

function Bar() {
  const { theme } = useConfig();
  const insets = useSafeAreaInsets();

  return (
    <>
      <View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
          },
          { height: insets.top, backgroundColor: theme.primary },
        ]}
      />
      <StatusBar translucent style="light" />
    </>
  );
}

SplashScreen.preventAutoHideAsync();

function Content() {
  useAuthWatcher();

  const { setLanguage } = useLanguage();

  const { theme } = useConfig();
  const { isFirstUse, setIsFirstUse } = useIsFirstUse();
  const { error } = useRequest();

  const [loaded, fontsError] = useFonts({
    BOLD: require('../../assets/fonts/Inter_18pt-Bold.ttf'),
    MEDIUM: require('../../assets/fonts/Inter_18pt-Medium.ttf'),
    ITALIC: require('../../assets/fonts/Inter_18pt-Italic.ttf'),
    REGULAR: require('../../assets/fonts/Inter_18pt-Regular.ttf'),
    SEMIBOLD: require('../../assets/fonts/Inter_18pt-SemiBold.ttf'),
  });

  const [appIsReady, setAppIsReady] = React.useState(false);

  React.useEffect(() => {
    async function prepare() {
      try {
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLanguage(languageState$.get());
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();

    initializeHttpClient(process.env.EXPO_PUBLIC_API_URL);
  }, []);

  React.useEffect(() => {
    if (error) toastShow({ type: 'error', text: error });
  }, [error]);

  React.useEffect(() => {
    if ((loaded || fontsError) && appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [loaded, fontsError, appIsReady]);

  if (isFirstUse) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Onboarding
          onFinish={() => {
            setIsFirstUse(false);
          }}
        />
      </SafeAreaView>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.white }}>
        <Toast />

        <Slot />
      </SafeAreaView>
    </I18nextProvider>
  );
}
