import { ConfigContext, ExpoConfig } from 'expo/config';
import { version } from './package.json';

const SLUG = '@creditwave/customer';

// App production config
const APP_NAME = 'Credit Wave';
const BUNDLE_IDENTIFIER = 'com.creditwave.customer';
const PACKAGE_NAME = 'com.creditwave.customer';
const ICON = './assets/icon.png';
const ADAPTIVE_ICON = './assets/adaptive-icon.png';
const SCHEME = 'creditwave-customer';

export default ({
  config,
}: ConfigContext): Partial<ExpoConfig & { expo: ExpoConfig }> => {
  const APP_ENV =
    (process.env.APP_ENV as 'development' | 'preview' | 'production') ||
    'development';

  console.log('⚙️ Building app for environment:', APP_ENV);
  const { name, bundleIdentifier, icon, adaptiveIcon, packageName, scheme } =
    getDynamicAppConfig(APP_ENV);

  return {
    ...config,
    expo: {
      name,
      scheme,
      slug: SLUG,
      version,
      icon,
      splash: {
        image: './assets/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
      updates: {
        fallbackToCacheTimeout: 0,
      },
      assetBundlePatterns: ['**/*'],
      ios: {
        bundleIdentifier,
        buildNumber: version,
        supportsTablet: true,
        requireFullScreen: true,
        infoPlist: {
          NSSpeechRecognitionUsageDescription:
            'Allow $(PRODUCT_NAME) to use speech recognition.',
          NSMicrophoneUsageDescription:
            'Allow $(PRODUCT_NAME) to use the microphone.',
          ITSAppUsesNonExemptEncryption: false,
        },
      },
      android: {
        package: packageName,
        adaptiveIcon: {
          foregroundImage: adaptiveIcon,
          backgroundColor: '#252879',
        },
        permissions: [
          'android.permission.CAMERA',
          'android.permission.RECORD_AUDIO',
        ],
      },
      web: {
        bundler: 'metro',
        favicon: './assets/favicon.png',
      },
      plugins: [
        'expo-router',
        [
          'expo-camera',
          {
            cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera',
            microphonePermission:
              'Allow $(PRODUCT_NAME) to access your microphone',
            recordAudioAndroid: true,
          },
        ],
        [
          'expo-screen-orientation',
          {
            initialOrientation: 'DEFAULT',
          },
        ],
        'expo-asset',
        [
          'expo-font',
          {
            fonts: [
              './assets/fonts/Inter_18pt-Bold.ttf',
              './assets/fonts/Inter_18pt-Medium.ttf',
              './assets/fonts/Inter_18pt-Regular.ttf',
              './assets/fonts/Inter_18pt-SemiBold.ttf',
            ],
          },
        ],
      ],
    },
  };
};

// Dynamically configure the app based on the environment.
// Update these placeholders with your actual values.
export const getDynamicAppConfig = (
  environment: 'development' | 'preview' | 'production'
) => {
  if (environment === 'production') {
    return {
      name: APP_NAME,
      bundleIdentifier: BUNDLE_IDENTIFIER,
      packageName: PACKAGE_NAME,
      icon: ICON,
      adaptiveIcon: ADAPTIVE_ICON,
      scheme: SCHEME,
    };
  }

  if (environment === 'preview') {
    return {
      name: `${APP_NAME} (Preview)`,
      bundleIdentifier: `${BUNDLE_IDENTIFIER}.preview`,
      packageName: `${PACKAGE_NAME}.preview`,
      icon: './assets/icon.png',
      adaptiveIcon: './assets/adaptive-icon.png',
      scheme: `${SCHEME}-prev`,
    };
  }

  return {
    name: `${APP_NAME} (Dev)`,
    bundleIdentifier: `${BUNDLE_IDENTIFIER}.dev`,
    packageName: `${PACKAGE_NAME}.dev`,
    icon: './assets/icon.png',
    adaptiveIcon: './assets/adaptive-icon.png',
    scheme: `${SCHEME}-dev`,
  };
};
