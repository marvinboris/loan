import { usePaginatedApi } from '@creditwave/hooks';
import { Filter, Pagination, Table, useBreadcrumb } from '@creditwave/ui-web';
import React from 'react';

type Item = {
  date: string;
  kyc: number;
  borrow: number;
  amount: number;
};

export function CbordMarketing() {
  useBreadcrumb(['Cbord', 'Marketing']);

  const { data, error, loading, refetch } =
    usePaginatedApi<Item>('/cbord/marketing');

  return (
    <>
      <Filter refetch={refetch} fields={[]} />

      <Table
        error={error}
        loading={loading}
        data={data?.items || []}
        fields={[
          { label: 'DISBURSEMENT DATE', key: 'date' },
          { label: 'KYC', key: 'kyc' },
          { label: 'BORROW', key: 'borrow' },
          { label: 'AMOUNT', key: 'amount' },
        ]}
      />

      <Pagination total={data?.total} />
    </>
  );
}
