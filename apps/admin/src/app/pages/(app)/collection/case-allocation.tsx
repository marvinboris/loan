import { useApi, usePaginatedApi } from '@creditwave/hooks';
import {
  Button,
  Distribution,
  Filter,
  Pagination,
  Table,
  useBreadcrumb,
} from '@creditwave/ui-web';
import React from 'react';
import { collectionService } from '../../../services';

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

  const [selected, setSelected] = React.useState<number[]>([]);

  const { data, error, loading, refetch } = usePaginatedApi<Item>(
    '/collection/case-allocation'
  );

  const { data: collectors } = useApi<Record<string, string>>(
    '/admin/collection/collectors'
  );

  return (
    <>
      <Filter
        refetch={refetch}
        className="grid-cols-3"
        fields={[
          {
            type: 'select',
            key: 'stage',
            label: 'Stage',
            options: {
              '': 'Select a stage',
              'S-1': '1 day to pay',
              S0: 'Due date',
              S1: 'Overdue day 1-7',
              S3: 'Overdue day 8-15',
              S4: 'Overdue day 16-30',
              S5: 'Overdue day 31+',
            },
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
        <Distribution
          selected={selected}
          collectors={collectors}
          onSubmit={async (data) => {
            const result = await collectionService.distribution(data);
            if (result.success) {
              refetch();
              setSelected([]);
            }
            return result;
          }}
        />
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
        selectable={{
          selected,
          setSelected,
        }}
        data={data?.items || []}
        fields={[
          { label: 'LOAN NUMBER', key: 'loanNum' },
          { label: 'LOAN ORDER NUMBER', key: 'loanOrderNum' },
          { label: 'APP NAME', key: 'appName' },
          { label: 'NAME', key: 'name' },
          { label: 'COLLECTOR', key: 'collector' },
          // { label: 'DISTRICT', key: 'district' },
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
        ]}
      />

      <Pagination total={data?.total} />
    </>
  );
}
