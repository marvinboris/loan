import { usePaginatedApi } from '@creditwave/hooks';
import { Filter, Pagination, Table, useBreadcrumb } from '@creditwave/ui-web';
import React from 'react';

type Item = {
  repaymentNum: string;
  loanNum: string;
  product: string;
  name: string;
  mobile: string;
  tradingStatus: string;
  repaymentCodeVaLink: string;
  repaymentAmt: string;
  realAmt: string;
  latestFollowUpTime: string;
  followUpResults: string;
  descFollowUp: string;
  whetherAssigned: string;
  operation: string;
};

export function FinancialRepaymentInquiries() {
  useBreadcrumb(['Financial', 'Repayment inquiries']);

  const { data, error, loading, refetch } = usePaginatedApi<Item>(
    '/financial/repayment-inquiries'
  );

  return (
    <>
      <Filter
        refetch={refetch}
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
            type: 'number',
            key: 'daysOverdue',
            label: 'Days overdue',
          },
          {
            type: 'text',
            key: 'repaymentCodeVaLink',
            label: 'Repayment code(VA)/link',
          },
          {
            type: 'select',
            key: 'tradingStatus',
            label: 'Trading status',
            options: {
              '': 'Select a status',
            },
          },
          {
            type: 'select',
            key: 'paymentChannel',
            label: 'Payment channel',
            options: {
              '': 'Select a channel',
            },
          },
          {
            type: 'text',
            key: 'repayment',
            label: 'Repayment',
          },
          {
            type: 'date',
            key: 'creationTime',
            label: 'Creation time',
          },
          {
            type: 'date',
            key: 'paybackTime',
            label: 'Payback time',
          },
          {
            type: 'text',
            key: 'loanNumber',
            label: 'Loan number',
          },
          {
            type: 'text',
            key: 'repaymentNumber',
            label: 'Repayment number',
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
            key: 'paymentCompanySerialNumber',
            label: 'Payment company serial number',
          },
          {
            type: 'number',
            key: 'numPayment',
            label: 'Number of the payment',
          },
          {
            type: 'text',
            key: 'product',
            label: 'Product name',
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
          { label: 'REPAYMENT NUMBER', key: 'repaymentNum', width: 100 },
          { label: 'LOAN NUMBER', key: 'loanNum', width: 100 },
          { label: 'PRODUCT NAME', key: 'product' },
          { label: 'NAME', key: 'name' },
          { label: 'MOBILE', key: 'mobile' },
          { label: 'TRADING STATUS', key: 'tradingStatus' },
          { label: 'REPAYMENT CODE(VA)/LINK', key: 'repaymentCodeVaLink' },
          { label: 'REPAYMENT AMOUNT', key: 'repaymentAmt' },
          { label: 'REAL AMOUNT', key: 'realAmt' },
          { label: 'LATEST FOLLOW-UP TIME', key: 'latestFollowUpTime' },
          { label: 'FOLLOW-UP RESULTS', key: 'followUpResults' },
          { label: 'DESCRIPTION OF FOLLOW-UP', key: 'descFollowUp' },
          { label: 'WHETHER IT HAS BEEN ASSIGNED', key: 'whetherAssigned' },
          { label: 'OPERATION', key: 'operation' },
        ]}
      />

      <Pagination total={data?.total} />
    </>
  );
}
