import { useFetchArray } from '@creditwave/hooks';
import {
  Button,
  Filter,
  Pagination,
  Table,
  useBreadcrumb,
} from '@creditwave/ui';
import React from 'react';

type Item = {
  personnel: string;
  loanNum: string;
  loanOrderNum: string;
  mobile: string;
  mark: string;
  recordContent: string;
  dailyCollectionTimes: string;
  collectionTimes: string;
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

  const { data, error, loading } = useFetchArray<Item>('collection/records');

  return (
    <>
      <Filter
        exportable
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
        data={
          data?.items || [
            {
              personnel: 'John DOE',
              loanNum: '100000',
              loanOrderNum: '100000000',
              mobile: '612345678',
              mark: 'Regular record',
              recordContent: 'Indisponible',
              dailyCollectionTimes: '0',
              collectionTimes: '10',
              contact: '',
              targetContact: '',
              connection: '',
              willingnessPay: '',
              overdueReason: '',
              result: '',
              recordTime: '2025-01-01 00:00:00',
            },
          ]
        }
        fields={[
          { label: 'COLLECTION PERSONNEL', key: 'personnel' },
          { label: 'LOAN NUMBER', key: 'loanNum' },
          { label: 'LOAN ORDER NUMBER', key: 'loanOrderNum' },
          { label: 'MOBILE', key: 'mobile' },
          { label: 'COLLECTION MARK', key: 'mark' },
          { label: 'COLLECTION RECORD CONTENT', key: 'recordContent' },
          { label: 'DAILY COLLECTION TIMES', key: 'dailyCollectionTimes' },
          { label: 'COLLECTION TIMES', key: 'collectionTimes' },
          { label: 'CONTACT', key: 'contact' },
          { label: 'TARGET CONTACT', key: 'targetContact' },
          { label: 'CONNECTION', key: 'connection' },
          { label: 'WILLINGNESS TO PAY', key: 'willingnessPay' },
          { label: 'OVERDUE REASON', key: 'overdueReason' },
          { label: 'COLLECTION RESULT', key: 'result' },
          { label: 'RECORD TIME', key: 'recordTime' },
        ]}
      />

      <Pagination totalPages={data?.totalPages} />
    </>
  );
}
