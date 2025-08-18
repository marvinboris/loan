import { usePaginatedApi } from '@creditwave/hooks';
import { Filter, Pagination, Table, useBreadcrumb } from '@creditwave/ui-web';
import React from 'react';

type Item = {
  personnel: string;
  loanNum: string;
  loanOrderNum: string;
  mobile: string;
  mark: string;
  recordContent: string;
  dailyTimes: string;
  times: string;
  contact: string;
  targetContact: string;
  connection: string;
  willingnessPay: string;
  overdueReason: string;
  result: string;
  recordTime: string;
};

export function CollectionRecords() {
  useBreadcrumb(['Collection', 'Collection records']);

  const { data, error, loading, refetch } = usePaginatedApi<Item>(
    '/collection/records'
  );

  return (
    <>
      <Filter
        exportable
        refetch={refetch}
        className="grid-cols-3"
        fields={[
          {
            type: 'select',
            key: 'personnel',
            label: 'Collection personnel',
            options: { '': 'Select a personnel' },
          },
          {
            type: 'text',
            key: 'loanNum',
            label: 'Loan number',
          },
          {
            type: 'text',
            key: 'loanOrderNum',
            label: 'Loan order number',
          },
          {
            type: 'text',
            key: 'mobile',
            label: 'Mobile',
          },
          {
            type: 'select',
            key: 'mark',
            label: 'Collection mark',
            options: { '': 'Select a mark' },
          },
          {
            type: 'date',
            key: 'recordTime',
            label: 'Record time',
          },
          {
            type: 'select',
            key: 'contact',
            label: 'Contact',
            options: { '': 'Select a contact' },
          },
          {
            type: 'select',
            key: 'targetContact',
            label: 'Target contact',
            options: {
              '': 'Select a contact',
            },
          },
          {
            type: 'select',
            key: 'connection',
            label: 'Connection',
            options: {
              '': 'Select a connection',
            },
          },
          {
            type: 'select',
            key: 'willingnessPay',
            label: 'Willingness to pay',
            options: {
              '': 'Select a choice',
            },
          },
          {
            type: 'select',
            key: 'overdueReason',
            label: 'Overdue reason',
            options: { '': 'Select a reason' },
          },
          {
            type: 'select',
            key: 'result',
            label: 'Collection result',
            options: { '': 'Select a result' },
          },
          null,
          null,
        ]}
      />

      <Table
        error={error}
        loading={loading}
        data={data?.items || []}
        fields={[
          { label: 'COLLECTION PERSONNEL', key: 'personnel' },
          { label: 'LOAN NUMBER', key: 'loanNum' },
          { label: 'LOAN ORDER NUMBER', key: 'loanOrderNum' },
          { label: 'MOBILE', key: 'mobile' },
          { label: 'COLLECTION MARK', key: 'mark' },
          { label: 'COLLECTION RECORD CONTENT', key: 'recordContent' },
          { label: 'DAILY COLLECTION TIMES', key: 'dailyTimes' },
          { label: 'COLLECTION TIMES', key: 'times' },
          { label: 'CONTACT', key: 'contact' },
          { label: 'TARGET CONTACT', key: 'targetContact' },
          { label: 'CONNECTION', key: 'connection' },
          { label: 'WILLINGNESS TO PAY', key: 'willingnessPay' },
          { label: 'OVERDUE REASON', key: 'overdueReason' },
          { label: 'COLLECTION RESULT', key: 'result' },
          { label: 'RECORD TIME', key: 'recordTime' },
        ]}
      />

      <Pagination total={data?.total} />
    </>
  );
}
