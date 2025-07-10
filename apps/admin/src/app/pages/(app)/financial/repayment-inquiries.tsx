import { useFetchArray } from '@creditwave/hooks';
import { Filter, Pagination, Table, useBreadcrumb } from '@creditwave/ui';
import React from 'react';

type Item = {
  repaymentNum: string;
  loanNum: string;
  productName: string;
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

  const { data, error, loading } = useFetchArray<Item>(
    'financial/repayment-inquiries'
  );

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
            type: 'number',
            key: 'daysOverdue',
            label: 'Days Overdue',
          },
          {
            type: 'text',
            key: 'repaymentCodeVaLink',
            label: 'Repayment Code(VA)/Link',
          },
          {
            type: 'select',
            key: 'tradingStatus',
            label: 'Trading Status',
            options: {
              '': 'Select a status',
            },
          },
          {
            type: 'select',
            key: 'paymentChannel',
            label: 'Payment Channel',
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
            label: 'Creation Time',
          },
          {
            type: 'date',
            key: 'paybackTime',
            label: 'Payback Time',
          },
          {
            type: 'text',
            key: 'loanNumber',
            label: 'Loan Number',
          },
          {
            type: 'text',
            key: 'repaymentNumber',
            label: 'Repayment Number',
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
            label: 'Payment Company Serial Number',
          },
          {
            type: 'number',
            key: 'numPayment',
            label: 'Number of the Payment',
          },
          {
            type: 'text',
            key: 'productName',
            label: 'Product Name',
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
              repaymentNum: '612345678',
              loanNum: '612345678',
              productName: 'Credit Loan',
              name: 'John DOE',
              mobile: '612345678',
              tradingStatus: '-',
              repaymentCodeVaLink: '-',
              repaymentAmt: '0.00',
              realAmt: '0.00',
              latestFollowUpTime: '-',
              followUpResults: '-',
              descFollowUp: '-',
              whetherAssigned: 'No',
              operation: 'Recording',
            },
          ]
        }
        fields={[
          { label: 'REPAYMENT NUMBER', key: 'repaymentNum', width: 100 },
          { label: 'LOAN NUMBER', key: 'loanNum', width: 100 },
          { label: 'PRODUCT NAME', key: 'productName' },
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

      <Pagination totalPages={data?.totalPages} />
    </>
  );
}
