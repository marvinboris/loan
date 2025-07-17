import { usePaginatedApi } from '@creditwave/hooks';
import { Filter, Pagination, Table, useBreadcrumb } from '@creditwave/ui-web';
import React from 'react';

type Item = {
  date: string;
  groupName: string;
  ranking: string;
  totalAssignedQty: string;
  newAssignedNum: string;
  targetRepayRate: string;
  targetNum: string;
  numOfApps: string;
  appRate: string;
  numOfApprovedApps: string;
  handleNum: string;
  bonus: string;
  updateTime: string;
};

export function CollectionTeamDailyReport() {
  useBreadcrumb(['Collection', 'Performance management', 'Group stats daily']);

  const { data, error, loading } = usePaginatedApi<Item>(
    '/collection/performance-management/team-daily'
  );

  return (
    <>
      <Filter
        exportable
        className="grid-cols-2"
        fields={[
          {
            type: 'select',
            key: 'group',
            label: 'Collection Group',
            options: { '': 'Select a group' },
          },
          {
            type: 'date',
            key: 'date',
            label: 'Date',
          },
          null,
        ]}
      />

      <Table
        error={error}
        loading={loading}
        data={data?.items || []}
        fields={[
          { label: 'DATE', key: 'date', width: 100 },
          { label: 'GROUP NAME', key: 'groupName' },
          { label: 'RANKING', key: 'ranking' },
          { label: 'TOTAL ASSIGNED QUANTITY', key: 'totalAssignedQty' },
          { label: 'NEW ASSIGNED NUM', key: 'newAssignedNum' },
          { label: 'TARGET REPAY RATE%', key: 'targetRepayRate' },
          { label: 'TARGET NUM', key: 'targetNum' },
          { label: 'NUMBER OF APPLICATIONS', key: 'numOfApps' },
          { label: 'APPLICATION RATE', key: 'appRate' },
          {
            label: 'NUMBER OF APPROVED APPLICATIONS',
            key: 'numOfApprovedApps',
          },
          { label: 'HANDLE NUM', key: 'handleNum' },
          { label: 'BONUS', key: 'bonus' },
          { label: 'UPDATE TIME', key: 'updateTime' },
        ]}
      />

      <Pagination total={data?.total} />
    </>
  );
}
