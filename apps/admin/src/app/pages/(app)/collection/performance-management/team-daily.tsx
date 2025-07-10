import { useFetchArray } from '@creditwave/hooks';
import { Filter, Pagination, Table, useBreadcrumb } from '@creditwave/ui';
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

  const { data, error, loading } = useFetchArray<Item>(
    'collection/performance-management/team-daily'
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
        data={
          data?.items || [
            {
              date: '2025-06-01',
              groupName: 'Te_apply',
              ranking: '1',
              totalAssignedQty: '123588',
              newAssignedNum: '1365',
              targetRepayRate: '25.00',
              targetNum: '344',
              numOfApps: '226',
              appRate: '16.56',
              numOfApprovedApps: '3',
              handleNum: '468',
              bonus: '0.00',
              updateTime: '2025-06-30 04:01:20',
            },
          ]
        }
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

      <Pagination totalPages={data?.totalPages} />
    </>
  );
}
