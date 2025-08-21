import { usePaginatedApi } from '@creditwave/hooks';
import { Kyc as KycType } from '@creditwave/types';
import {
  Filter,
  Kyc,
  Pagination,
  Table,
  useBreadcrumb,
} from '@creditwave/ui-web';
import React from 'react';

type Item = {
  mobile: string;
  name: string;
  account: string;
  prevRepaymentTime: string;
  appName: string;
  followUpPerson: string;
  kyc?: KycType;
  borrow?: {
    id: number;
  };
  whetherApply: string;
  appTime: string;
  allocationTime: string;
  latestFollowUpTime: string;
  followUpResults: string;
  descFollowUp: string;
  whetherAssigned: string;
  otp: string;
  operation: string;
};

export function AllCustomers() {
  useBreadcrumb(['All customers']);

  const [selected, setSelected] = React.useState<number[]>([]);

  const { data, error, loading, refetch } = usePaginatedApi<Item>(
    '/telemarketing/all-customers'
  );

  return (
    <>
      <Filter
        refetch={refetch}
        className="grid-cols-3"
        fields={[
          {
            type: 'date',
            key: 'importDate',
            label: 'Import Date',
          },
          {
            type: 'date',
            key: 'followUpDate',
            label: 'Follow-up Date',
          },
          {
            type: 'text',
            key: 'userLabel',
            label: 'User Label',
          },
          {
            type: 'text',
            key: 'mobile',
            label: 'Mobile',
          },
          {
            type: 'text',
            key: 'telemarketer',
            label: 'Telemarketer',
          },
          {
            type: 'select',
            key: 'whetherApply',
            label: 'Whether to Apply',
            options: {
              '': 'Select a reason',
            },
          },
          {
            type: 'text',
            key: 'allocationTime',
            label: 'Allocation Time',
          },
          {
            type: 'select',
            key: 'whetherAssigned',
            label: 'Whether it has been Assigned',
            options: {
              '': 'Select a reason',
            },
          },
          {
            type: 'select',
            key: 'whetherFollowedUp',
            label: 'Whether it has been Followed up',
            options: {
              '': 'Select a reason',
            },
          },
          {
            type: 'select',
            key: 'latestFollowUpPerson',
            label: 'Latest Follow-up Person',
            options: {
              '': 'Select a person',
            },
          },
          {
            type: 'select',
            key: 'appName',
            label: 'App name',
            options: { '': 'Select an app' },
          },
        ]}
      />

      <Table
        error={error}
        loading={loading}
        selectable={{
          selected,
          setSelected,
        }}
        data={(data?.items || []).map((item) => ({
          ...item,
          operation: (
            <div>
              {item.kyc ? (
                <Kyc
                  values={item.kyc}
                  uploadsUrl={import.meta.env.VITE_API_URL + '/../'}
                />
              ) : undefined}
            </div>
          ),
          whetherAssigned: item.followUpPerson ? 'Yes' : 'No',
        }))}
        fields={[
          { label: 'MOBILE', key: 'mobile', width: 100 },
          { label: 'NAME', key: 'name' },
          { label: 'ACCOUNT', key: 'account' },
          { label: 'PREVIOUS REPAYMENT TIME', key: 'prevRepaymentTime' },
          { label: 'OTP', key: 'otp' },
          { label: 'APP NAME', key: 'appName' },
          { label: 'FOLLOW-UP PERSON', key: 'followUpPerson' },
          // { label: '100', key: '100' },
          { label: 'WHETHER TO APPLY', key: 'whetherApply' },
          { label: 'APPLICATION TIME', key: 'appTime' },
          { label: 'ALLOCATION TIME', key: 'allocationTime' },
          { label: 'LATEST FOLLOW-UP TIME', key: 'latestFollowUpTime' },
          { label: 'FOLLOW-UP RESULTS', key: 'followUpResults' },
          {
            label: 'DESCRIPTION OF FOLLOW-UP',
            key: 'descFollowUp',
            width: 200,
          },
          { label: 'WHETHER IT HAS BEEN ASSIGNED', key: 'whetherAssigned' },
          { label: 'OPERATION', key: 'operation' },
        ]}
      />

      <Pagination total={data?.total} />
    </>
  );
}
