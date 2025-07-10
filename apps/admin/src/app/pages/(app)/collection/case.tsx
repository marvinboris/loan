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
  mobile: string;
  name: string;
  loanNum: string;
  loanOrderNum: string;
  collectionStage: string;
  collector: string;
  productName: string;
  loanTenure: string;
  loanAmt: string;
  dueDate: string;
  loanType: string;
  collectionResult: string;
  appName: string;
  dailyCollectionTimes: string;
  collectionTimes: string;
  collectorLog: string;
  logUpdateTime: string;
  lendingTime: string;
  paymentTime: string;
  totalRepayment: string;
  appStatus: string;
};

export function CollectionCase() {
  useBreadcrumb(['Collection', 'Collection case']);

  const { data, error, loading } = useFetchArray<Item>('collection/case');

  return (
    <>
      <Filter
        className="grid-cols-3"
        fields={[
          {
            type: 'text',
            key: 'mobile',
            label: 'Mobile',
          },
          {
            type: 'text',
            key: 'name',
            label: 'Name',
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
            key: 'collectionStage',
            label: 'Collection stage',
            options: { '': 'Select a stage' },
          },
          {
            type: 'select',
            key: 'collector',
            label: 'Collector',
            options: {
              '': 'Select a collector',
            },
          },
          {
            type: 'text',
            key: 'productName',
            label: 'Product name',
          },
          {
            type: 'select',
            key: 'loanTenure',
            label: 'Loan tenure',
            options: {
              '': 'Select a tenure',
            },
          },
          {
            type: 'number',
            key: 'loanAmt',
            label: 'Loan amount',
          },
          {
            type: 'select',
            key: 'appVersion',
            label: 'App version',
            options: {
              '': 'Select a version',
            },
          },
          {
            type: 'date',
            key: 'dueDate',
            label: 'Due date',
          },
          {
            type: 'select',
            key: 'loanStatus',
            label: 'Loan status',
            options: {
              '': 'Select a status',
            },
          },
          {
            type: 'select',
            key: 'tag',
            label: 'Tag',
            options: {
              '': 'Select a tag',
            },
          },
          {
            type: 'select',
            key: 'repeatedBorrowing',
            label: 'Is it repeated borrowing',
            options: {
              '': 'Select a choice',
            },
          },
          {
            type: 'select',
            key: 'loanType',
            label: 'Loan type',
            options: {
              '': 'Select a type',
            },
          },
          {
            type: 'number',
            key: 'collectionResult',
            label: 'Collection result',
          },
          {
            type: 'select',
            key: 'followUpDay',
            label: 'Did you follow-up on the day',
            options: {
              '': 'Select a choice',
            },
          },
          {
            type: 'text',
            key: 'appName',
            label: 'App name',
          },
          {
            span: 2,
            type: 'number',
            key: 'proportion',
            label:
              'The proportion of the amount to be repaid without penalty interest is less than',
          },
        ]}
      />

      <Table
        error={error}
        loading={loading}
        data={
          data?.items || [
            {
              loanNum: '100000',
              loanOrderNum: '175181271023',
              appName: 'Credit Wave',
              name: 'John DOE',
              mobile: '612345678',
              dueDate: '2025-07-16',
              productName: 'Credit Loan',
              collector: '',
              collectionStage: '',
              dailyCollectionTimes: '0',
              collectionTimes: '0',
              collectorLog: '',
              collectionResult: '',
              logUpdateTime: '',
              lendingTime: '2025-07-06 15:38:54',
              paymentTime: '2025-07-09 00:22:28',
              totalRepayment: '14000',
              loanAmt: '14000',
              loanTenure: '10D',
              loanType: 'payday',
              appStatus: 'Repayment period',
            },
          ]
        }
        fields={[
          { label: 'LOAN NUMBER', key: 'loanNum' },
          { label: 'LOAN ORDER NUMBER', key: 'loanOrderNum' },
          { label: 'APP NAME', key: 'appName' },
          { label: 'NAME', key: 'name' },
          { label: 'MOBILE', key: 'mobile' },
          { label: 'DUE DATE', key: 'dueDate' },
          { label: 'PRODUCT NAME', key: 'productName' },
          { label: "COLLECTOR'S NAME", key: 'collector' },
          { label: 'COLLECTION STAGE', key: 'collectionStage' },
          { label: 'DAILY COLLECTION TIMES', key: 'dailyCollectionTimes' },
          { label: 'COLLECTION TIMES', key: 'collectionTimes' },
          { label: 'COLLECTOR LOG', key: 'collectorLog' },
          { label: 'COLLECTION RESULT', key: 'collectionResult' },
          { label: 'LOG UPDATE TIME', key: 'logUpdateTime' },
          { label: 'LENDING TIME', key: 'lendingTime' },
          { label: 'PAYMENT TIME', key: 'paymentTime' },
          { label: 'TOTAL REPAYMENT', key: 'totalRepayment' },
          { label: 'LOAN AMOUNT', key: 'loanAmt' },
          { label: 'LOAN TENURE', key: 'loanTenure' },
          { label: 'LOAN TYPE', key: 'loanType' },
          { label: 'APP STATUS', key: 'appStatus' },
        ]}
      />

      <Pagination totalPages={data?.totalPages} />
    </>
  );
}
