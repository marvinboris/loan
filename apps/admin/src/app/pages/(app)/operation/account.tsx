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
import { cn } from '@creditwave/utils';

type FormValues = {
  id?: string;
  email: string;
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
  status: 'active' | 'inactive';
  changePwd?: React.ReactNode;
  operation?: React.ReactNode;
};

export function OperationAccount() {
  useBreadcrumb(['Operation', 'Account']);

  const { data, error, loading, refetch } =
    usePaginatedApi<Item>('/operation/account');

  const [adding, setAdding] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [freezing, setFreezing] = React.useState(false);
  const [unfreezing, setUnfreezing] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const [userId, setUserId] = React.useState<number>();

  return (
    <>
      <Create show={adding} setShow={setAdding} refetch={refetch} />

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
        data={(data?.items || []).map((item) => {
          const user = {
            id: item.serialNum,
            account: item.account,
            distributionRules: item.collectionDistributionRules,
            email: item.email,
            entryTime: item.entryTime.split('T')[0],
            group: item.group,
            name: item.name,
            role: item.role,
            rulesApprovingDistribution: item.rulesApprovingDistribution,
            staffLvl: item.staffLvl,
            weights: +item.weights,
            loginSecurityVerification: true,
            status: item.status,
          };
          const isActive = userId?.toString() === user.id.toString();
          return {
            ...item,
            status: (
              <div
                className={cn(
                  'capitalize font-medium',
                  { active: 'text-green-600', inactive: 'text-red-600' }[
                    item.status
                  ]
                )}
              >
                {item.status}
              </div>
            ),
            operation: (
              <div className="flex gap-2 flex-wrap">
                {isActive && (
                  <Create
                    show={editing}
                    setShow={setEditing}
                    user={user}
                    refetch={refetch}
                  />
                )}
                <Button
                  onClick={() => {
                    setEditing(true);
                    setUserId(+user.id);
                  }}
                >
                  Edit
                </Button>

                {user.status === 'active' ? (
                  <>
                    {isActive && (
                      <Freeze
                        show={freezing}
                        setShow={setFreezing}
                        user={user}
                        refetch={refetch}
                      />
                    )}
                    <Button
                      onClick={() => {
                        setFreezing(true);
                        setUserId(+user.id);
                      }}
                    >
                      Freeze
                    </Button>
                  </>
                ) : (
                  <>
                    {isActive && (
                      <Unfreeze
                        show={unfreezing}
                        setShow={setUnfreezing}
                        user={user}
                        refetch={refetch}
                      />
                    )}
                    <Button
                      onClick={() => {
                        setUnfreezing(true);
                        setUserId(+user.id);
                      }}
                    >
                      Unfreeze
                    </Button>
                  </>
                )}

                {isActive && (
                  <Delete
                    show={deleting}
                    setShow={setDeleting}
                    user={user}
                    refetch={refetch}
                  />
                )}
                <Button
                  onClick={() => {
                    setDeleting(true);
                    setUserId(+user.id);
                  }}
                >
                  Delete
                </Button>
              </div>
            ),
          };
        })}
        fields={[
          { label: 'SERIAL NUMBER', key: 'serialNum' },
          { label: 'ACCOUNT', key: 'account' },
          { label: 'EMAIL', key: 'email' },
          { label: 'NAME', key: 'name' },
          { label: 'WORK NUMBER', key: 'workNum' },
          { label: 'STATUS', key: 'status' },
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

function Create(props: {
  show: boolean;
  setShow: (show: boolean) => void;
  refetch(): void;
  user?: FormValues;
}) {
  const initialValues: FormValues = props.user || {
    email: '',
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
    <Modal title={props.user ? 'Edit account' : 'Create account'} {...props}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (data, { resetForm }) => {
          const result = await operationService[
            props.user ? 'editAccount' : 'createAccount'
          ](data);
          if (result.success) {
            toastShow({ type: 'success', text: result.message });
            if (!props.user) resetForm();
            props.setShow(false);
            props.refetch();
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
          isSubmitting,
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

              <Button loading={isSubmitting}>Confirm</Button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
}

function Freeze(props: {
  show: boolean;
  setShow: (show: boolean) => void;
  refetch(): void;
  user: FormValues;
}) {
  const initialValues = {
    id: props.user.id,
  };

  return (
    <Modal title="Freeze account" {...props}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (data, { resetForm }) => {
          const result = await operationService.freezeAccount(data);
          if (result.success) {
            toastShow({ type: 'success', text: result.message });
            resetForm();
            props.setShow(false);
            props.refetch();
          }
        }}
      >
        {({ handleSubmit, resetForm, isSubmitting }) => (
          <form
            className="flex flex-col gap-2.5"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="text-center">
              Are you sure you want to freeze this account?
            </div>

            <div className="flex justify-center gap-2.5 mt-10">
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

              <Button loading={isSubmitting}>Confirm</Button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
}

function Unfreeze(props: {
  show: boolean;
  setShow: (show: boolean) => void;
  user: FormValues;
  refetch(): void;
}) {
  const initialValues = {
    id: props.user.id,
  };

  return (
    <Modal title="Freeze account" {...props}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (data, { resetForm }) => {
          const result = await operationService.unfreezeAccount(data);
          if (result.success) {
            toastShow({ type: 'success', text: result.message });
            resetForm();
            props.setShow(false);
            props.refetch();
          }
        }}
      >
        {({ handleSubmit, resetForm, isSubmitting }) => (
          <form
            className="flex flex-col gap-2.5"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="text-center">
              Are you sure you want to unfreeze this account?
            </div>

            <div className="flex justify-center gap-2.5 mt-10">
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

              <Button loading={isSubmitting}>Confirm</Button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
}

function Delete(props: {
  show: boolean;
  setShow: (show: boolean) => void;
  user: FormValues;
  refetch(): void;
}) {
  const initialValues = {
    id: props.user.id,
  };

  return (
    <Modal title="Delete account" {...props}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (data, { resetForm }) => {
          const result = await operationService.deleteAccount(data);
          if (result.success) {
            toastShow({ type: 'success', text: result.message });
            resetForm();
            props.setShow(false);
            props.refetch();
          }
        }}
      >
        {({ handleSubmit, resetForm, isSubmitting }) => (
          <form
            className="flex flex-col gap-2.5"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="text-center">
              Are you sure you want to delete this account?
            </div>

            <div className="flex justify-center gap-2.5 mt-10">
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

              <Button loading={isSubmitting}>Confirm</Button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
}
