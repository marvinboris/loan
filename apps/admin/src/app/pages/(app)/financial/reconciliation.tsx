import { usePaginatedApi } from '@creditwave/hooks';
import { Filter, Pagination, Table, useBreadcrumb } from '@creditwave/ui';
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

export function FinancialReconciliation() {
  useBreadcrumb(['Financial', 'Reconciliation']);

  const { data, error, loading } = usePaginatedApi<Item>(
    '/financial/reconciliation'
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
            key: 'loanNum',
            label: 'Loan number',
          },
          {
            type: 'number',
            key: 'masterLoanNum',
            label: 'Master loan number',
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
