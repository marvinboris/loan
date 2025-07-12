import { usePaginatedApi } from '@creditwave/hooks';
import {
  Button,
  Filter,
  Pagination,
  Table,
  useBreadcrumb,
} from '@creditwave/ui';
import { PlusIcon } from '@heroicons/react/24/outline';
import React from 'react';

type Item = {
  loanNum: string;
  loanOrderNum: string;
  appName: string;
  name: string;
  district: string;
  mobile: string;
  dueDate: string;
  daysOverdue: string;
  totalRepayment: string;
  dailyTimes: string;
  times: string;
  log: string;
  result: string;
  logUpdateTime: string;
  product: string;
  userLvl: string;
  loanAmt: string;
  loanTenure: string;
  loanType: string;
  appStatus: string;
  appChannel: string;
  amtRepaid: string;
  collector: string;
};

export function CollectionCaseAllocation() {
  useBreadcrumb(['Collection', 'Case allocation']);

  const { data, error, loading } = usePaginatedApi<Item>(
    '/collection/case-allocation'
  );

  return (
    <>
      <Filter
        className="grid-cols-3"
        fields={[
          {
            type: 'select',
            key: 'stage',
            label: 'Stage',
            options: { '': 'Select a stage' },
          },
          {
            type: 'select',
            key: 'collector',
            label: 'Collector',
            options: { '': 'Select a collector' },
          },
          {
            type: 'select',
            key: 'product',
            label: 'Product name',
            options: { '': 'Select a product' },
          },
          {
            type: 'select',
            key: 'userSelect',
            label: 'User select',
            options: { '': 'Select a user' },
          },
          {
            type: 'number',
            key: 'numLoans',
            label: 'Number of loans',
          },
          {
            type: 'select',
            key: 'appChannel',
            label: 'Application channel',
            options: {
              '': 'Select a channel',
            },
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
            type: 'select',
            key: 'repeatedBorrowing',
            label: 'Is it repeated borrowing',
            options: { '': 'Select a choice' },
          },
          {
            type: 'number',
            key: 'daysOverdue',
            label: 'Days overdue',
          },
          {
            type: 'text',
            key: 'mobile',
            label: 'Mobile',
          },
          {
            type: 'select',
            key: 'result',
            label: 'Collection result',
            options: {
              '': 'Select a result',
            },
          },
          {
            type: 'select',
            key: 'largeGroup',
            label: 'Large collection group',
            options: {
              '': 'Select a group',
            },
          },
          {
            type: 'select',
            key: 'district',
            label: 'District',
            options: {
              '': 'Select a district',
            },
          },
          {
            type: 'select',
            key: 'otherStates',
            label: 'Other states',
            options: {
              '': 'Select a state',
            },
          },
          {
            type: 'select',
            key: 'appName',
            label: 'App name',
            options: { '': 'Select an app' },
          },
          {
            type: 'date',
            key: 'dueDate',
            label: 'Due date',
          },
        ]}
      />

      <div className="flex gap-2.5">
        <Button disabled variant="outline" icon={PlusIcon}>
          Distribution
        </Button>
        <Button disabled variant="outline">
          Assignment within large groups
        </Button>
        <Button disabled variant="outline">
          Add to blacklist
        </Button>
      </div>

      <Table
        error={error}
        loading={loading}
        data={data?.items || []}
        fields={[
          { label: 'LOAN NUMBER', key: 'loanNum' },
          { label: 'LOAN ORDER NUMBER', key: 'loanOrderNum' },
          { label: 'APP NAME', key: 'appName' },
          { label: 'NAME', key: 'name' },
          { label: 'DISTRICT', key: 'district' },
          { label: 'MOBILE', key: 'mobile' },
          { label: 'DUE DATE', key: 'dueDate' },
          { label: 'DAYS OVERDUE', key: 'daysOverdue' },
          { label: 'TOTAL REPAYMENT', key: 'totalRepayment' },
          { label: 'DAILY COLLECTION TIMES', key: 'dailyTimes' },
          { label: 'COLLECTION TIMES', key: 'times' },
          { label: 'COLLECTOR LOG', key: 'log' },
          { label: 'COLLECTION RESULT', key: 'result' },
          { label: 'LOG UPDATE TIME', key: 'logUpdateTime' },
          { label: 'PRODUCT NAME', key: 'product' },
          { label: 'USER LEVEL', key: 'userLvl' },
          { label: 'LOAN AMOUNT', key: 'loanAmt' },
          { label: 'LOAN TENURE', key: 'loanTenure' },
          { label: 'LOAN TYPE', key: 'loanType' },
          { label: 'APP STATUS', key: 'appStatus' },
          { label: 'APP CHANNEL', key: 'appChannel' },
          { label: 'AMOUNT REPAID', key: 'amtRepaid' },
          { label: 'COLLECTOR', key: 'collector' },
        ]}
      />

      <Pagination total={data?.total} />
    </>
  );
}
