import { useFetchArray } from '@creditwave/hooks';
import { Filter, Pagination, Table, useBreadcrumb } from '@creditwave/ui';
import React from 'react';

type Item = {
  dateRange: string;
  groupRange: string;
  ranking: string;
  collectorsName: string;
  totalAssignedQty: string;
  newAssignedNum: string;
  targetRepayRate: string;
  targetNum: string;
  numOfApps: string;
  appRate: string;
  numOfApprovedApps: string;
  handleNum: string;
  bonus: string;
  status: string;
  daysOfEmployment: string;
  updateTime: string;
};

export function CollectionMonthlyReport() {
  useBreadcrumb([
    'Collection',
    'Performance management',
    'Collector stats monthly',
  ]);

  const { data, error, loading } = useFetchArray<Item>(
    'collection/performance-management/monthly'
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
          {
            type: 'select',
            key: 'status',
            label: 'Status',
            options: { '': 'Select a status' },
          },
        ]}
      />

      <Table
        error={error}
        loading={loading}
        data={
          data?.items || [
            {
              dateRange: '2025-06-01 ~ 2025-06-29',
              groupRange: 'Te_apply',
              ranking: '1',
              collectorsName: 'John DOE',
              totalAssignedQty: '123588',
              newAssignedNum: '1365',
              targetRepayRate: '25.00',
              targetNum: '344',
              numOfApps: '226',
              appRate: '16.56',
              numOfApprovedApps: '3',
              handleNum: '468',
              bonus: '0.00',
              status: 'ACTIVATED',
              daysOfEmployment: '241',
              updateTime: '2025-06-30 04:01:20',
            },
          ]
        }
        fields={[
          { label: 'DATE RANGE', key: 'dateRange', width: 180 },
          { label: 'GROUP RANGE', key: 'groupRange' },
          { label: 'RANKING', key: 'ranking' },
          { label: "COLLECTOR'S NAME", key: 'collectorsName' },
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
          { label: 'STATUS', key: 'status' },
          { label: 'DAYS OF EMPLOYMENT', key: 'daysOfEmployment' },
          { label: 'UPDATE TIME', key: 'updateTime' },
        ]}
      />

      <Pagination totalPages={data?.totalPages} />
    </>
  );
}
