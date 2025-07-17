import { usePaginatedApi } from '@creditwave/hooks';
import {
  Button,
  Filter,
  Pagination,
  Table,
  toastShow,
  useBreadcrumb,
} from '@creditwave/ui-web';
import React from 'react';
import { telemarketingService } from '../../../services';

type Item = {
  mobile: string;
  name: string;
  prevRepaymentTime: string;
  appName: string;
  followUpPerson: string;
  100: string;
  whetherApply: string;
  appTime: string;
  allocationTime: string;
  latestFollowUpTime: string;
  followUpResults: string;
  descFollowUp: string;
  whetherAssigned: string;
  operation: string;
};

export function TelemarketingOldCustomers() {
  useBreadcrumb(['Telemarketing', 'Cases of old customers not loaning again']);

  const { data, error, loading } = usePaginatedApi<Item>(
    '/telemarketing/old-customers'
  );

  const handleDataImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const file = files?.item(0);

    if (!file) return toastShow({ type: 'error', text: 'No file selected' });

    const formData = new FormData();
    formData.append('file', file);

    const result = await telemarketingService.dataImport('old')(formData);
    if (result.success)
      return toastShow({ type: 'success', text: result.message });
  };

  return (
    <>
      <Filter
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

      <div className="flex gap-2.5">
        <Button
          onClick={() =>
            (
              document.querySelector('#data-import') as HTMLInputElement | null
            )?.click()
          }
        >
          Data Import
        </Button>
        <input
          type="file"
          accept=".xlsx"
          id="data-import"
          className="hidden"
          onChange={handleDataImport}
        />

        <Button color="disabled" className="text-red-600">
          Export Excel
        </Button>
        <Button className="opacity-50">Manual Assignment</Button>
        <Button className="opacity-50">Release</Button>
      </div>

      <Table
        error={error}
        loading={loading}
        data={data?.items || []}
        fields={[
          { label: 'MOBILE', key: 'mobile', width: 100 },
          { label: 'NAME', key: 'name' },
          { label: 'PREVIOUS REPAYMENT TIME', key: 'prevRepaymentTime' },
          { label: 'APP NAME', key: 'appName' },
          { label: 'FOLLOW-UP PERSON', key: 'followUpPerson' },
          { label: '100', key: '100' },
          { label: 'WHETHER TO APPLY', key: 'whetherApply' },
          { label: 'APPLICATION TIME', key: 'appTime' },
          { label: 'ALLOCATION TIME', key: 'allocationTime' },
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
