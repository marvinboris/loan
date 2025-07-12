import { usePaginatedApi } from '@creditwave/hooks';
import { Filter, Pagination, Table, useBreadcrumb } from '@creditwave/ui';
import React from 'react';

type Item = {
  date: string;
  groupName: string;
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
  numOfCalls: string;
  numOfConnections: string;
  phoneConnectionRate: string;
  totalCallDuration: string;
  firstCallTime: string;
  latestCallTime: string;
  caseCoverage: string;
  numOfSms: string;
  status: string;
  daysOfEmployment: string;
  updateTime: string;
};

export function TelemarketingDailyReport() {
  useBreadcrumb([
    'Telemarketing',
    'Performance management',
    'Telemarketing daily report',
  ]);

  const { data, error, loading } = usePaginatedApi<Item>(
    '/telemarketing/performance-management/daily'
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
          { label: 'DATE', key: 'date', width: 100 },
          { label: 'GROUP NAME', key: 'groupName' },
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
          { label: 'NUMBER OF CALLS', key: 'numOfCalls' },
          { label: 'NUMBER OF CONNECTIONS', key: 'numOfConnections' },
          { label: 'PHONE CONNECTION RATE', key: 'phoneConnectionRate' },
          { label: 'TOTAL CALL DURATION', key: 'totalCallDuration' },
          { label: 'FIRST CALL TIME', key: 'firstCallTime' },
          { label: 'LATEST CALL TIME', key: 'latestCallTime' },
          { label: 'CASE COVERAGE%', key: 'caseCoverage' },
          { label: 'NUMBER OF SMS', key: 'numOfSms' },
          { label: 'STATUS', key: 'status' },
          { label: 'DAYS OF EMPLOYMENT', key: 'daysOfEmployment' },
          { label: 'UPDATE TIME', key: 'updateTime' },
        ]}
      />

      <Pagination total={data?.total} />
    </>
  );
}
