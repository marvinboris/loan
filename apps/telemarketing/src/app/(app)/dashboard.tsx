import { useApi, useTitle } from '@creditwave/hooks';
import { Customer, CustomerProps, Section } from '@creditwave/ui';
import React from 'react';

export default function Page() {
  useTitle('To-do list');

  const { data, loading } = useApi<{ data: CustomerProps[]; success: boolean }>(
    '/telemarketing/dashboard'
  );

  return (
    <Section loading={loading}>
      {(data?.data || []).map((item, index) => (
        <Customer key={index} {...item} />
      ))}
    </Section>
  );
}
