import { useApi, useTitle } from '@creditwave/hooks';
import { Customer, CustomerProps, Section, toastShow } from '@creditwave/ui';
import React from 'react';
import { telemarketingService } from '../../services';

export default function Page() {
  useTitle('To-do list');

  const { data, loading, refetch } = useApi<{
    data: CustomerProps[];
    success: boolean;
  }>('/telemarketing/dashboard');

  return (
    <Section loading={loading}>
      {(data?.data || []).map((item, index) => (
        <Customer
          key={index}
          {...item}
          onSubmit={async (data) => {
            const result = await telemarketingService.markAsDone(data);
            if (result.success) {
              toastShow({ type: 'success', text: result.message });
              refetch();
            }
          }}
          onRecordOnce={async (data) => {
            const result = await telemarketingService.recordOnce(data);
            if (result.success) {
              toastShow({ type: 'success', text: result.message });
              refetch();
            }
          }}
        />
      ))}
    </Section>
  );
}
