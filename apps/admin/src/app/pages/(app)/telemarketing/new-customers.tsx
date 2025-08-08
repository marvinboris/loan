import { useApi, usePaginatedApi } from '@creditwave/hooks';
import {
  Borrow,
  Button,
  Filter,
  Kyc,
  ManualAssignment,
  Pagination,
  Release,
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
  kyc?: {
    id: number;

    first_name?: string;
    last_name: string;
    location: string;
    birthdate: string;
    emergency_number_1: string;
    emergency_number_2?: string;
    front_photo: string;
    back_photo: string;
    selfie: string;
    status: string;
  };
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
  operation: string;
};

export function TelemarketingNewCustomers() {
  useBreadcrumb(['Telemarketing', 'Cases of new customers']);

  const [selected, setSelected] = React.useState<number[]>([]);

  const { data, error, loading, refetch } = usePaginatedApi<Item>(
    '/telemarketing/new-customers'
  );

  const { data: telemarketers } = useApi<Record<string, string>>(
    '/admin/telemarketing/telemarketers'
  );

  const handleDataImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const file = files?.item(0);

    if (!file) return toastShow({ type: 'error', text: 'No file selected' });

    const formData = new FormData();
    formData.append('file', file);

    const result = await telemarketingService.dataImport('new')(formData);
    if (result.success) {
      refetch();
      toastShow({ type: 'success', text: result.message });
    }
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
        <ManualAssignment
          selected={selected}
          telemarketers={telemarketers}
          onSubmit={async (data) => {
            const result = await telemarketingService.manualAssignment(data);
            if (result.success) {
              refetch();
              setSelected([]);
            }
            return result;
          }}
        />
        <Release
          selected={selected}
          onSubmit={async (data) => {
            const result = await telemarketingService.release(data);
            if (result.success) {
              refetch();
              setSelected([]);
            }
            return result;
          }}
        />
      </div>

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
                  uploadsUrl={import.meta.env.VITE_API_URL + '/../'}
                  values={item.kyc}
                  onSubmit={async (data) => {
                    const result = await telemarketingService.kycValidation(
                      data
                    );
                    if (result.success) refetch();
                    return result;
                  }}
                />
              ) : undefined}
              {item.borrow ? (
                <Borrow
                  values={{
                    ...item.borrow,
                    name: item.name,
                    mobile: item.mobile,
                  }}
                  onSubmit={async (data) => {
                    const result = await telemarketingService.borrowValidation(
                      data
                    );
                    if (result.success) refetch();
                    return result;
                  }}
                />
              ) : undefined}
            </div>
          ),
        }))}
        fields={[
          { label: 'MOBILE', key: 'mobile', width: 100 },
          { label: 'NAME', key: 'name' },
          { label: 'PREVIOUS REPAYMENT TIME', key: 'prevRepaymentTime' },
          { label: 'APP NAME', key: 'appName' },
          { label: 'FOLLOW-UP PERSON', key: 'followUpPerson' },
          // { label: '100', key: '100' },
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
