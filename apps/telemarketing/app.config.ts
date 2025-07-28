import { ConfigContext, ExpoConfig } from 'expo/config';
import { version } from './package.json';

const SLUG = 'creditwave-telemarketing';

// App production config
const APP_NAME = 'Credit Wave Telemarketing';
const BUNDLE_IDENTIFIER = 'com.creditwave.telemarketing';
const PACKAGE_NAME = 'com.creditwave.telemarketing';
const ICON = './assets/icon.png';
const ADAPTIVE_ICON = './assets/adaptive-icon.png';
const SCHEME = 'creditwave-telemarketing';

export default ({ config }: ConfigContext): ExpoConfig => {
  const APP_ENV =
    (process.env.APP_ENV as 'development' | 'preview' | 'production') ||
    'development';

  console.log('⚙️ Building app for environment:', APP_ENV);
  const { name, bundleIdentifier, icon, adaptiveIcon, packageName, scheme } =
    getDynamicAppConfig(APP_ENV);

  return {
    ...config,
    name,
    scheme,
    slug: SLUG,
    version,
    icon,
    jsEngine: 'hermes',
    splash: {
      image: './assets/icon.png',
      resizeMode: 'contain',
      backgroundColor: '#585572',
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
        backgroundColor: '#ffffff',
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
      [
        'expo-build-properties',
        {
          android: {
            enableBundleCompression: true,
            enableProguardInReleaseBuilds: true,
            enableShrinkResourcesInReleaseBuilds: true,
            useLegacyPackaging: true,
            enableSeparateBuildPerCPUArchitecture: true,
            packagingOptions: {
              pickFirst: [
                '**/libc++_shared.so',
                '**/libjsc.so',
                '**/libreactnativejni.so',
              ],
            },
          },
        },
      ],
    ],
    extra: {
      eas: {
        projectId: '5b725e90-f6ba-479a-a4b9-14311d59296c',
      },
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

// Use current code to minify the android bundle
// android/app/build.gradle
/**
 * ...
 * android {
 *    ...
 *    splits {
 *      abi {
 *        enable true
 *        reset()
 *        include 'arm64-v8a'
 *        universalApk false
 *      }
 *    }
 * }
 */
