import { useFetchArray } from '@creditwave/hooks';
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
  dailyCollectionTimes: string;
  collectionTimes: string;
  collectorLog: string;
  collectionResult: string;
  logUpdateTime: string;
  productName: string;
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

  const { data, error, loading } = useFetchArray<Item>('collection/case-allocation');

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
            key: 'productName',
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
            key: 'collectionResult',
            label: 'Collection result',
            options: {
              '': 'Select a result',
            },
          },
          {
            type: 'select',
            key: 'largeCollectionGroup',
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
        data={
          data?.items || [
            {
              loanNum: '102822',
              loanOrderNum: '175181271023',
              appName: 'Credit Wave',
              name: 'John DOE',
              district: 'Littoral',
              mobile: '612345678',
              dueDate: '2025-07-16',
              daysOverdue: '-7',
              totalRepayment: '14000',
              dailyCollectionTimes: '0',
              collectionTimes: '0',
              collectorLog: '',
              collectionResult: '',
              logUpdateTime: '',
              productName: 'Credit Loan',
              userLvl: 'Level 1',
              loanAmt: '14000',
              loanTenure: '10D',
              loanType: 'payday',
              appStatus: 'Repayment period',
              appChannel: 'default',
              amtRepaid: '0',
              collector: '',
            },
          ]
        }
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
          { label: 'DAILY COLLECTION TIMES', key: 'dailyCollectionTimes' },
          { label: 'COLLECTION TIMES', key: 'collectionTimes' },
          { label: 'COLLECTOR LOG', key: 'collectorLog' },
          { label: 'COLLECTION RESULT', key: 'collectionResult' },
          { label: 'LOG UPDATE TIME', key: 'logUpdateTime' },
          { label: 'PRODUCT NAME', key: 'productName' },
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

      <Pagination totalPages={data?.totalPages} />
    </>
  );
}
