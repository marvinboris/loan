import { useConfig, useIsFirstUse } from '@creditwave/hooks';
import { Onboarding } from '@creditwave/ui';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const onWeb = Platform.OS === 'web';

export default function Layout() {
  React.useEffect(() => {
    if (Platform.OS === 'ios')
      ScreenOrientation.lockPlatformAsync({
        screenOrientationArrayIOS: [
          ScreenOrientation.Orientation.PORTRAIT_UP,
          ScreenOrientation.Orientation.LANDSCAPE_LEFT,
          ScreenOrientation.Orientation.LANDSCAPE_RIGHT,
        ],
      });
  }, []);

  return (
    <>
      <Bar />
      <Content />
    </>
  );
}

function Bar() {
  const { theme } = useConfig();

  return <StatusBar style="light" backgroundColor={theme?.primary} />;
}

SplashScreen.preventAutoHideAsync();

function Content() {
  const { isFirstUse, setIsFirstUse } = useIsFirstUse();

  const [loaded, error] = useFonts({
    BOLD: require('../../assets/fonts/Inter_18pt-Bold.ttf'),
    MEDIUM: require('../../assets/fonts/Inter_18pt-Medium.ttf'),
    ITALIC: require('../../assets/fonts/Inter_18pt-Italic.ttf'),
    REGULAR: require('../../assets/fonts/Inter_18pt-Regular.ttf'),
    SEMIBOLD: require('../../assets/fonts/Inter_18pt-SemiBold.ttf'),
  });

  const [appIsReady, setAppIsReady] = React.useState(false);
  const [displayingOnboarding, setDisplayingOnboarding] = React.useState(false);

  React.useEffect(() => {
    async function prepare() {
      try {
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
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
    if ((loaded || error) && appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error, appIsReady]);

  if (isFirstUse && !onWeb) {
    if (displayingOnboarding)
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <Onboarding
            onFinish={() => {
              setDisplayingOnboarding(false);
              setIsFirstUse(false);
            }}
          />
        </SafeAreaView>
      );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Slot />
    </SafeAreaView>
  );
}
