import { useApi, useConfig, useTitle } from '@creditwave/hooks';
import { Placeholder, Typography } from '@creditwave/ui';
import { router, Slot, useLocalSearchParams, usePathname } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native';
import { CollectionProvider, Data } from '../../../contexts';

export default function Layout() {
  const { theme } = useConfig();
  const { id } = useLocalSearchParams<{ id: string }>();
  const pathname = usePathname();

  useTitle('#' + id);

  const { data, loading } = useApi<Data>('/collection/' + id);

  const Menu = React.useCallback(
    ({ label, to }: { label: string; to: string }) => {
      const link = ['/' + id, to].filter(Boolean).join('/');
      const active = pathname === to;
      return (
        <Pressable
          onPress={() => router.navigate(link)}
          style={[
            {
              paddingHorizontal: 12,
              paddingVertical: 4,
              opacity: 0.5,
              borderBottomWidth: 1,
              borderColor: 'transparent',
            },
            active && { opacity: 1, borderColor: theme.black },
          ]}
        >
          <Typography>{label}</Typography>
        </Pressable>
      );
    },
    []
  );

  return loading ? (
    <ActivityIndicator size="large" />
  ) : (
    <View style={{ gap: 8 }}>
      <ScrollView horizontal>
        <Menu label="Collection" to="" />
        <Menu label="Info" to="info" />
        <Menu label="Mark" to="mark" />
        <Menu label="Contacts" to="contacts" />
        <Menu label="Emergency" to="emergency" />
        <Menu label="Personalized contacts" to="personalized-contacts" />
        <Menu label="Call history" to="call-history" />
      </ScrollView>

      {data ? (
        <CollectionProvider {...data}>
          <Slot />
        </CollectionProvider>
      ) : (
        <Placeholder />
      )}
    </View>
  );
}
