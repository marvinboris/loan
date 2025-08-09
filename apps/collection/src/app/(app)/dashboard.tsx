import { useApi, useTitle } from '@creditwave/hooks';
import {
  Card,
  CollectionLoan,
  CollectionLoanProps,
  Section,
  Typography,
} from '@creditwave/ui';
import { router } from 'expo-router';
import React from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';

export default function Page() {
  useTitle('Dashboard');

  const { data, loading, refetch } = useApi<{
    fullPayments: string;
    weekPerformance: string;
    partialPayments: string;
    totalTickets: number;
    target: number;
    collectionAmount: number;
    requests: CollectionLoanProps[];
    success: boolean;
  }>('/collection/dashboard');

  const Performance = React.useCallback(
    ({ label, value }: { label: string; value: string | number }) => (
      <View style={{ alignItems: 'center' }}>
        <Typography>{label}</Typography>
        <Typography family="BOLD">{value}</Typography>
      </View>
    ),
    []
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refetch} />
      }
    >
      <View style={{ gap: 10 }}>
        <Card title="Day performance" bodyStyle={{ flexDirection: 'row' }}>
          {data && (
            <>
              <View style={{ flex: 1 }}>
                <Performance label="Full payments" value={data.fullPayments} />
                <Performance
                  label="Partial payments"
                  value={data.partialPayments}
                />
                <Performance label="Target" value={data.target} />
              </View>

              <View style={{ flex: 1 }}>
                <Performance
                  label="Week performance"
                  value={data.weekPerformance}
                />
                <Performance label="Total tickets" value={data.totalTickets} />
                <Performance
                  label="Collection amount"
                  value={data.collectionAmount}
                />
              </View>
            </>
          )}
        </Card>

        <Section titleText="Pending requests" loading={loading}>
          {(data?.requests || []).map((item, index) => (
            <CollectionLoan
              key={index}
              {...item}
              onPress={(item) => router.push('/' + item.loan_number)}
            />
          ))}
        </Section>
      </View>
    </ScrollView>
  );
}
