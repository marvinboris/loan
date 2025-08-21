import { usePaginatedApi } from '@creditwave/hooks';
import {
  Button,
  FormGroup,
  Input,
  Modal,
  Pagination,
  Select,
  Table,
  toastShow,
  useBreadcrumb,
} from '@creditwave/ui-web';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Formik } from 'formik';
import React from 'react';
import { operationService } from '../../../services';

type FormValues = {
  id?: string;
  name: string;
  features: string[];
};

type Item = {
  serialNum: string;
  name: string;
  features: string[];
  operation?: React.ReactNode;
};

const options = {
  'all-customers': 'All customers',
  telemarketing: 'Telemarketing',
  financial: 'Financial',
  collection: 'Collection',
  operation: 'Operation',
  validation: 'Validation',
  cbord: 'Cbord',
};

export function OperationGroup() {
  useBreadcrumb(['Operation', 'Group']);

  const { data, error, loading, refetch } =
    usePaginatedApi<Item>('/operation/group');

  const [adding, setAdding] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const [groupId, setGroupId] = React.useState<number>();

  return (
    <>
      <Create show={adding} setShow={setAdding} refetch={refetch} />

      <div className="flex justify-end">
        <Button
          type="button"
          icon={PlusIcon}
          color="disabled"
          className="text-red-600"
          onClick={() => setAdding(true)}
        >
          Create
        </Button>
      </div>

      <Table
        error={error}
        loading={loading}
        data={(data?.items || []).map((item) => {
          const group = {
            id: item.serialNum,
            name: item.name,
            features: item.features,
          };
          const isActive = groupId?.toString() === group.id.toString();
          return {
            ...item,
            features: (
              <div>
                {Object.keys(item.features)
                  .map((f) => options[f as keyof typeof options])
                  .join(', ')}
              </div>
            ),
            operation: (
              <div className="flex gap-2 flex-wrap">
                {isActive && (
                  <Create
                    group={group}
                    show={editing}
                    refetch={refetch}
                    setShow={setEditing}
                  />
                )}
                <Button
                  onClick={() => {
                    setEditing(true);
                    setGroupId(+group.id);
                  }}
                >
                  Edit
                </Button>

                {isActive && (
                  <Delete
                    group={group}
                    show={deleting}
                    refetch={refetch}
                    setShow={setDeleting}
                  />
                )}
                <Button
                  onClick={() => {
                    setDeleting(true);
                    setGroupId(+group.id);
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
          { label: 'NAME', key: 'name' },
          { label: 'FEATURES', key: 'features' },
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
  group?: FormValues;
}) {
  const initialValues: FormValues = props.group
    ? {
        ...props.group,
        features: Object.keys(props.group.features),
      }
    : {
        name: '',
        features: [],
      };

  return (
    <Modal title={props.group ? 'Edit group' : 'Create group'} {...props}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (data, { resetForm }) => {
          const features: Record<string, any> = {};
          data.features.forEach((f) => {
            features[f] = '*';
          });
          const result = await operationService[
            props.group ? 'editGroup' : 'createGroup'
          ]({ ...data, features });
          if (result.success) {
            toastShow({ type: 'success', text: result.message });
            if (!props.group) resetForm();
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
              required
              name="name"
              label="Name"
              id="create-name"
              error={errors.name}
              value={values.name}
              onChange={handleChange('name')}
            />

            <Features
              label="Features"
              value={values.features}
              onChange={(value) => setFieldValue('features', value)}
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

function Delete(props: {
  show: boolean;
  setShow: (show: boolean) => void;
  group: FormValues;
  refetch(): void;
}) {
  const initialValues = {
    id: props.group.id,
  };

  return (
    <Modal title="Delete group" {...props}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (data, { resetForm }) => {
          const result = await operationService.deleteGroup(data);
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
              Are you sure you want to delete this group?
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

function Features({
  value: features,
  onChange,
  label,
}: {
  value: string[];
  label: string;
  onChange: (value: string[]) => void;
}) {
  return (
    <FormGroup label={label}>
      <div className="flex flex-col gap-2">
        {features.map((value, index) => (
          <Select
            value={value}
            options={options}
            id={'create-add-' + index}
            name={'features[' + index + ']'}
            onChange={(e) =>
              onChange(
                features?.map((f, i) => (i === index ? e.target.value : f))
              )
            }
          />
        ))}

        <Select
          value=""
          name="add"
          id="create-add"
          onChange={(e) => onChange(features.concat(e.target.value))}
          options={{
            '': 'Select a feature',
            ...options,
          }}
        />
      </div>
    </FormGroup>
  );
}
