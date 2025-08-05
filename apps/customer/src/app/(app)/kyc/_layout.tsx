import { useConfig, useTitle } from '@creditwave/hooks';
import { Typography } from '@creditwave/ui';
import { Slot, usePathname } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { CheckIcon } from 'react-native-heroicons/outline';

export default function Layout() {
  const { theme } = useConfig();
  const pathname = usePathname();
  useTitle('KYC');

  const currentIndex = React.useMemo(() => {
    const numText = pathname.split('/').pop();
    if (!numText || isNaN(+numText)) return 0;
    return +numText;
  }, [pathname]);

  const isActive = (index: number) => currentIndex === index;
  const isBefore = (index: number) => index < currentIndex;

  return (
    <View style={{ gap: 6, flex: 1 }}>
      {pathname !== '/kyc/completed' && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'relative',
            marginHorizontal: 36,
          }}
        >
          <View
            style={{
              zIndex: -1,
              top: 16,
              left: 0,
              right: 0,
              height: 5,
              position: 'absolute',
              backgroundColor: theme.disabled,
              transform: [{ translateY: -2.5 }],
            }}
          />

          {['Info', 'Front', 'Back', 'Selfie'].map((title, index) => {
            const active = isActive(index);
            const before = isBefore(index);

            return (
              <View key={'kyc-head-' + index} style={{ gap: 8 }}>
                <View
                  style={[
                    {
                      width: 32,
                      height: 32,
                      borderRadius: 9999,
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        theme[active || before ? 'black' : 'white'],
                    },
                  ]}
                >
                  {before ? (
                    <CheckIcon color={theme.white} />
                  ) : (
                    <Typography color={active ? 'white' : 'grey0'}>
                      {index + 1}
                    </Typography>
                  )}
                </View>

                <Typography
                  align="center"
                  style={{ fontSize: 10 }}
                  color={active || before ? 'black' : 'grey0'}
                >
                  {title}
                </Typography>
              </View>
            );
          })}
        </View>
      )}

      <ScrollView>
        <Slot />
      </ScrollView>
    </View>
  );
}
