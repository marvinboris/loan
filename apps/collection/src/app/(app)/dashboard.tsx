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
import { View } from 'react-native';

export default function Page() {
  useTitle('Dashboard');

  const { data, loading } = useApi<{
    dayRevenue: string;
    monthRevenue: string;
    requestHistory: number;
    reimbursementRate: number;
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
    <View style={{ gap: 10 }}>
      <Card title="Day performance" bodyStyle={{ flexDirection: 'row' }}>
        {data && (
          <>
            <View style={{ flex: 1 }}>
              <Performance label="Day revenue" value={data.dayRevenue} />
              <Performance
                label="Request history"
                value={data.requestHistory}
              />
              <Performance label="Target" value={data.target} />
            </View>

            <View style={{ flex: 1 }}>
              <Performance label="Month revenue" value={data.monthRevenue} />
              <Performance
                label="Reimbursement rate"
                value={data.reimbursementRate}
              />
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
            onPress={(item) => router.push('/' + item.loanNumber)}
          />
        ))}
      </Section>
    </View>
  );
}
