import { useAuth, useConfig, usePageTitle } from '@creditwave/hooks';
import { Logo, Transition, Typography } from '@creditwave/ui';
import { router, Slot, usePathname } from 'expo-router';
import React from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import {
  ArrowLeftIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';

export default function Layout() {
  const { isAuthenticated } = useAuth();
  const { theme } = useConfig();
  const { title } = usePageTitle();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const onDashboard = React.useMemo(
    () => pathname === '/dashboard',
    [pathname]
  );

  React.useEffect(() => {
    if (!isAuthenticated) router.navigate('/login');
  }, [isAuthenticated]);

  const NavItem = React.useCallback(
    (props: { title: string; href: string }) => {
      return (
        <Pressable
          style={({ pressed }) => [
            { paddingVertical: 12, paddingHorizontal: 16 },
            pressed && { backgroundColor: theme.primary + '22' },
          ]}
          onPress={() => {
            router.push(props.href);
            setIsMenuOpen(false);
          }}
        >
          <Typography>{props.title}</Typography>
        </Pressable>
      );
    },
    []
  );

  return (
    <View style={{ minHeight: '100%' }}>
      <Transition
        show={isMenuOpen}
        style={{
          top: 0,
          left: 0,
          zIndex: 50,
          width: '100%',
          position: 'absolute',
          height: Dimensions.get('screen').height,
        }}
      >
        <Pressable
          onPress={() => setIsMenuOpen(false)}
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            backgroundColor: theme.black + '22',
          }}
        >
          <Pressable
            style={{
              backgroundColor: theme.white,
              alignSelf: 'stretch',
              width: 254,
              paddingVertical: 12,
              gap: 8,
            }}
          >
            <Logo />

            <View>
              <NavItem title="Profile" href="/profile" />
            </View>

            <View
              style={{
                marginTop: 'auto',
                marginBottom: 40,
              }}
            >
              <NavItem title="Logout" href="/logout" />
            </View>
          </Pressable>
        </Pressable>
      </Transition>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 8,
          paddingHorizontal: 4,
        }}
      >
        <Pressable
          onPress={
            onDashboard
              ? () => setIsMenuOpen(true)
              : () => router.navigate('/dashboard')
          }
          style={{
            width: 48,
            height: 48,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {onDashboard ? (
            <Bars3Icon color={theme.black} />
          ) : (
            <ArrowLeftIcon color={theme.black} />
          )}
        </Pressable>

        <Typography style={{ flex: 1 }} align="center" size="xl">
          {title}
        </Typography>

        {onDashboard ? (
          <Pressable
            style={{
              width: 48,
              height: 48,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 9999,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MagnifyingGlassIcon color={theme.black} />
            </View>
          </Pressable>
        ) : (
          <View style={{ width: 32, height: 32 }} />
        )}
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <Slot />
      </View>
    </View>
  );
}
