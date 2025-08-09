import { useApi, useConfig, useTitle } from '@creditwave/hooks';
import { Placeholder, Typography } from '@creditwave/ui';
import { router, Slot, useLocalSearchParams, usePathname } from 'expo-router';
import React from 'react';
import { Pressable, RefreshControl, ScrollView, View } from 'react-native';
import { CollectionProvider, Data } from '../../../contexts';

export default function Layout() {
  const { theme } = useConfig();
  const { id } = useLocalSearchParams<{ id: string }>();
  const pathname = usePathname();

  useTitle('#' + id);

  const { data, loading, refetch } = useApi<Data>('/collection/' + id);

  const Menu = React.useCallback(
    ({ label, to }: { label: string; to: string }) => {
      const link = ['/' + id, to].filter(Boolean).join('/');
      const active = pathname === link;
      return (
        <Pressable
          onPress={() => router.navigate(link)}
          style={({ pressed }) => [
            {
              paddingHorizontal: 12,
              paddingVertical: 4,
              opacity: 0.5,
              borderBottomWidth: 1,
              borderColor: 'transparent',
            },
            active && { opacity: 1, borderColor: theme.black },
            pressed && { backgroundColor: theme.primary + '22' },
          ]}
        >
          <Typography>{label}</Typography>
        </Pressable>
      );
    },
    [pathname, id]
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refetch} />
      }
    >
      <View style={{ gap: 8 }}>
        <ScrollView horizontal>
          <Menu label="Collection" to="" />
          <Menu label="Info" to="info" />
          <Menu label="Mark" to="mark" />
        </ScrollView>

        {data ? (
          <CollectionProvider {...data} refetch={refetch}>
            <Slot />
          </CollectionProvider>
        ) : (
          <Placeholder />
        )}
      </View>
    </ScrollView>
  );
}
