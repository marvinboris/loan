import { useAuth, useConfig, usePageTitle } from '@creditwave/hooks';
import { Logo, Transition, Typography } from '@creditwave/ui';
import { router, Slot, usePathname } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Pressable, View } from 'react-native';
import {
  ArrowLeftIcon,
  Bars3Icon,
  UserIcon,
} from 'react-native-heroicons/outline';

export default function Layout() {
  const { t } = useTranslation();

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
    <View style={{ flex: 1 }}>
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
              <NavItem title={t('menu.applications')} href="/applications" />
              <NavItem title={t('menu.beneficiary')} href="/beneficiary" />
              <NavItem
                title={t('menu.privacy_policy')}
                href="/privacy-policy"
              />
              <NavItem title={t('menu.about_us')} href="/about-us" />
              <NavItem title={t('menu.language')} href="/language" />
            </View>

            <View
              style={{
                marginTop: 'auto',
                marginBottom: 40,
              }}
            >
              <NavItem title={t('menu.logout')} href="/logout" />
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
                backgroundColor: theme.primary + '22',
              }}
            >
              <UserIcon color={theme.primary} />
            </View>
          </Pressable>
        ) : (
          <View style={{ width: 32, height: 32 }} />
        )}
      </View>

      <View style={{ paddingHorizontal: 16, flex: 1 }}>
        <Slot />
      </View>
    </View>
  );
}
