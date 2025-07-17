import { usePaginatedApi } from '@creditwave/hooks';
import {
  Button,
  Filter,
  Input,
  Modal,
  Pagination,
  Radio,
  Select,
  Switch,
  Table,
  toastShow,
  useBreadcrumb,
} from '@creditwave/ui-web';
import { Formik } from 'formik';
import moment from 'moment';
import React from 'react';
import { operationService } from '../../../services';

type FormValues = {
  email: string;
  account: string;
  workNum?: string;
  name: string;
  password?: string;
  entryTime: string;
  group: string;
  weights: number;
  loginSecurityVerification?: boolean;
  role: string;
  voiceCollection?: boolean;
  staffLvl: string;
  distributionRules: string;
  rulesApprovingDistribution: string;
};

type Item = {
  serialNum: string;
  account: string;
  email: string;
  name: string;
  workNum: string;
  creationTime: string;
  entryTime: string;
  group: string;
  role: string;
  staffLvl: string;
  collectionDistributionRules: string;
  rulesApprovingDistribution: string;
  weights: string;
  voiceCollection: string;
  updateTime: string;
  loginIp: string;
  changePwd?: React.ReactNode;
  operation?: React.ReactNode;
};

export function OperationAccount() {
  useBreadcrumb(['Operation', 'Account']);

  const { data, error, loading } = usePaginatedApi<Item>('/operation/account');

  const [adding, setAdding] = React.useState(false);

  return (
    <>
      <Create show={adding} setShow={setAdding} />

      <Filter
        className="grid-cols-3"
        onAdd={() => setAdding(true)}
        fields={[
          {
            type: 'text',
            key: 'account',
            label: 'Account',
          },
          {
            type: 'email',
            key: 'email',
            label: 'Email',
          },
          {
            type: 'text',
            key: 'name',
            label: 'Name',
          },
          {
            type: 'select',
            key: 'status',
            label: 'Status',
            options: { '': 'Select a status' },
          },
          {
            type: 'select',
            key: 'group',
            label: 'Group',
            options: { '': 'Select a group' },
          },
          {
            type: 'text',
            key: 'workNum',
            label: 'Work number',
          },
          {
            type: 'select',
            key: 'voiceCollection',
            label: 'Voice collection',
            options: { '': 'Select a collection' },
          },
          {
            type: 'select',
            key: 'staffLvl',
            label: 'Staff level',
            options: { '': 'Select a level' },
          },
          {
            type: 'select',
            key: 'collectionDistributionRules',
            label: 'Collection distribution rules',
            options: { '': 'Select a rule' },
          },
          {
            type: 'select',
            key: 'rulesApprovingDistribution',
            label: 'Rules for approving distribution',
            options: { '': 'Select a rule' },
          },
          {
            type: 'select',
            key: 'role',
            label: 'Role',
            options: { '': 'Select a role' },
          },
        ]}
      />

      <Table
        error={error}
        loading={loading}
        data={data?.items || []}
        fields={[
          { label: 'SERIAL NUMBER', key: 'serialNum' },
          { label: 'ACCOUNT', key: 'account' },
          { label: 'EMAIL', key: 'email' },
          { label: 'NAME', key: 'name' },
          { label: 'WORK NUMBER', key: 'workNum' },
          { label: 'CREATION TIME', key: 'creationTime' },
          { label: 'ENTRY TIME', key: 'entryTime' },
          { label: 'GROUP', key: 'group' },
          { label: 'ROLE', key: 'role' },
          { label: 'STAFF LEVEL', key: 'staffLvl' },
          {
            label: 'COLLECTION DISTRIBUTION RULES',
            key: 'collectionDistributionRules',
          },
          {
            label: 'RULES FOR APPROVING DISTRIBUTION',
            key: 'rulesApprovingDistribution',
          },
          { label: 'WEIGHTS', key: 'weights' },
          { label: 'VOICE COLLECTION', key: 'voiceCollection' },
          { label: 'UPDATE TIME', key: 'updateTime' },
          { label: 'LOGIN IP', key: 'loginIp' },
          { label: 'CHANGE PASSWORD', key: 'changePwd', width: 100 },
          { label: 'OPERATION', key: 'operation', width: 180 },
        ]}
      />

      <Pagination total={data?.total} />
    </>
  );
}

function Create(props: { show: boolean; setShow: (show: boolean) => void }) {
  const initialValues: FormValues = {
    email: '',
    account: '',
    name: '',
    entryTime: moment().format('YYYY-MM-DD'),
    group: '',
    weights: 1,
    role: '',
    staffLvl: '',
    distributionRules: '',
    rulesApprovingDistribution: '',
  };

  return (
    <Modal title="Create account" {...props}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (data, { resetForm }) => {
          const result = await operationService.createAccount(data);
          if (result.success) {
            toastShow({ type: 'success', text: result.message });
            resetForm();
            props.setShow(false);
          }
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          resetForm,
          setFieldValue,
        }) => (
          <form
            className="flex flex-col gap-2.5"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Input
              inline
              required
              name="email"
              type="email"
              label="Email"
              id="create-email"
              error={errors.email}
              value={values.email}
              onChange={handleChange('email')}
              labelClassName="w-1/3 text-right"
            />

            <Input
              inline
              required
              name="account"
              label="Account"
              id="create-account"
              error={errors.account}
              value={values.account}
              labelClassName="w-1/3 text-right"
              onChange={handleChange('account')}
            />

            <Input
              inline
              name="workNum"
              id="create-workNum"
              label="Work number"
              error={errors.workNum}
              value={values.workNum}
              labelClassName="w-1/3 text-right"
              onChange={handleChange('workNum')}
            />

            <Input
              inline
              required
              name="name"
              label="Name"
              id="create-name"
              error={errors.name}
              value={values.name}
              onChange={handleChange('name')}
              labelClassName="w-1/3 text-right"
            />

            <Input
              inline
              name="password"
              type="password"
              label="Password"
              id="create-password"
              error={errors.password}
              value={values.password}
              labelClassName="w-1/3 text-right"
              onChange={handleChange('password')}
            />

            <Input
              inline
              required
              type="date"
              name="entryTime"
              label="Entry time"
              id="create-entryTime"
              error={errors.entryTime}
              value={values.entryTime}
              labelClassName="w-1/3 text-right"
              onChange={handleChange('entryTime')}
            />

            <Select
              inline
              required
              name="group"
              id="create-group"
              label="Which group"
              error={errors.group}
              value={values.group}
              onChange={handleChange('group')}
              labelClassName="w-1/3 text-right"
              options={{ '': 'Select a group', default: 'Default group' }}
            />

            <Input
              inline
              required
              type="number"
              name="weights"
              label="Weights"
              id="create-weights"
              error={errors.weights}
              value={values.weights}
              labelClassName="w-1/3 text-right"
              onChange={handleChange('weights')}
            />

            <Radio
              inline
              innerClassName="grid-cols-2"
              name="loginSecurityVerification"
              labelClassName="w-1/3 text-right"
              label="Login security verification"
              id="create-loginSecurityVerification"
              error={errors.loginSecurityVerification}
              value={values.loginSecurityVerification ? '1' : '0'}
              options={{ '1': 'Verification', '0': 'No verified' }}
              onChange={(e) =>
                setFieldValue(
                  'loginSecurityVerification',
                  e.target.value === '1'
                )
              }
            />

            <Select
              inline
              required
              name="role"
              id="create-role"
              label="Role name"
              error={errors.role}
              value={values.role}
              onChange={handleChange('role')}
              labelClassName="w-1/3 text-right"
              options={{
                '': 'Select a role',
                admin: 'Admin',
                telemarketer: 'Telemarketer',
                collector: 'Collector',
              }}
            />

            <Switch
              inline
              name="voiceCollection"
              label="Voice collection"
              id="create-voiceCollection"
              error={errors.voiceCollection}
              checked={values.voiceCollection}
              labelClassName="w-1/3 text-right"
              onChange={(value) => setFieldValue('voiceCollection', value)}
            />

            <Select
              inline
              required
              name="staffLvl"
              label="Staff level"
              id="create-staffLvl"
              error={errors.staffLvl}
              value={values.staffLvl}
              labelClassName="w-1/3 text-right"
              options={{
                '': 'Select a level',
                junior: 'Junior',
                mid: 'Mid',
                senior: 'Senior',
              }}
              onChange={handleChange('staffLvl')}
            />

            <Select
              inline
              name="distributionRules"
              id="create-distributionRules"
              error={errors.distributionRules}
              value={values.distributionRules}
              labelClassName="w-1/3 text-right"
              options={{ '': 'Select a rule' }}
              label="Collection distribution rules"
              onChange={handleChange('distributionRules')}
            />

            <Select
              inline
              labelClassName="w-1/3 text-right"
              name="rulesApprovingDistribution"
              options={{ '': 'Select a rule' }}
              id="create-rulesApprovingDistribution"
              label="Rules for approving distribution"
              error={errors.rulesApprovingDistribution}
              value={values.rulesApprovingDistribution}
              onChange={handleChange('rulesApprovingDistribution')}
            />

            <div className="flex justify-end gap-2.5 mt-10">
              <Button
                type="button"
                color="disabled"
                variant="outline"
                onClick={() => {
                  resetForm();
                  props.setShow(false);
                }}
              >
                Cancel
              </Button>

              <Button>Confirm</Button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
}
