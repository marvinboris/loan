import { usePaginatedApi } from '@creditwave/hooks';
import { Filter, Pagination, Table, useBreadcrumb } from '@creditwave/ui-web';
import React from 'react';

type Item = {
  date: string;
  all: number;
  remaining: number;
  dpd: number;
};

export function CbordCollection() {
  useBreadcrumb(['Cbord', 'Collection']);

  const { data, error, loading, refetch } =
    usePaginatedApi<Item>('/cbord/collection');

  return (
    <>
      <Filter refetch={refetch} fields={[]} />

      <Table
        error={error}
        loading={loading}
        data={
          data?.items.map((item) => ({
            ...item,
            dpd: <div>{item.dpd.toFixed(2)}%</div>,
          })) || []
        }
        fields={[
          { label: 'DUE DATE', key: 'date' },
          { label: 'ALL CLIENTS', key: 'all' },
          { label: 'REMAINING', key: 'remaining' },
          { label: 'DPD', key: 'dpd' },
        ]}
      />

      <Pagination total={data?.total} />
    </>
  );
}
