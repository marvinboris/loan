import { useApi, useTitle } from '@creditwave/hooks';
import { Customer, CustomerProps, Section } from '@creditwave/ui';
import React from 'react';
import { View } from 'react-native';

export default function Page() {
  useTitle('To-do list');

  const { data, loading } = useApi<{ data: CustomerProps[]; success: boolean }>(
    '/telemarketing/dashboard'
  );

  return (
    <View style={{ gap: 10 }}>
      <Section loading={loading}>
        {(data?.data || []).map((item, index) => (
          <Customer key={index} {...item} />
        ))}
      </Section>
    </View>
  );
}
