import { usePaginatedApi } from '@creditwave/hooks';
import { Filter, Pagination, Table, useBreadcrumb } from '@creditwave/ui-web';
import React from 'react';

type Item = {
  dateRange: string;
  groupRange: string;
  ranking: string;
  telemarketersName: string;
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

export function TelemarketingMonthlyReport() {
  useBreadcrumb([
    'Telemarketing',
    'Performance management',
    'Telemarketing monthly report',
  ]);

  const { data, error, loading } = usePaginatedApi<Item>(
    '/telemarketing/performance-management/monthly'
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
            label: 'Telemarketing Group',
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
        data={data?.items || []}
        fields={[
          { label: 'DATE RANGE', key: 'dateRange', width: 180 },
          { label: 'GROUP RANGE', key: 'groupRange' },
          { label: 'RANKING', key: 'ranking' },
          { label: "TELEMARKETER'S NAME", key: 'telemarketersName' },
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

      <Pagination total={data?.total} />
    </>
  );
}
