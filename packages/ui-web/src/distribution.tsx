import { PlusIcon } from '@heroicons/react/24/outline';
import { Formik } from 'formik';
import React from 'react';
import z from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';
import { Button } from './buttons';
import { Select } from './form';
import { Modal } from './modal';
import { toastShow } from './toast';

export type DistributionFormValues = {
  selected: number[];
  id: number;
};

export type DistributionProps = {
  selected: number[];
  collectors?: Record<string, string>;
  onSubmit(
    values: DistributionFormValues
  ): Promise<{ message: string; success: boolean }>;
};

export function Distribution(props: DistributionProps) {
  const [show, setShow] = React.useState(false);

  const disabled = React.useMemo(
    () => !props.selected.length,
    [props.selected.length]
  );

  return (
    <>
      {props.collectors && (
        <DistributionForm {...props} show={show} setShow={setShow} />
      )}

      <Button
        icon={PlusIcon}
        disabled={disabled}
        variant={disabled ? 'outline' : undefined}
        onClick={disabled ? undefined : () => setShow(true)}
      >
        Distribution
      </Button>
    </>
  );
}

function DistributionForm(
  props: DistributionProps & {
    show: boolean;
    setShow: (show: boolean) => void;
  }
) {
  const initialValues: DistributionFormValues = {
    selected: props.selected,
    id: +Object.keys(props.collectors || {})[0],
  };

  const Schema = React.useMemo(
    () =>
      z.object({
        selected: z.array(z.number()),
        id: z.number(),
      }),
    []
  );

  return (
    <Modal show={props.show} setShow={props.setShow} title="Distribution">
      <Formik
        initialValues={initialValues}
        validate={toFormikValidate(Schema)}
        onSubmit={async (values) => {
          console.log({ values });
          const result = await props.onSubmit(values);
          if (result.success) {
            toastShow({ type: 'success', text: result.message });
            props.setShow(false);
          }
        }}
      >
        {({ handleSubmit, setFieldValue, values, isValid, isSubmitting }) => (
          <form
            className="flex flex-col gap-2.5"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Select
              id="id"
              name="id"
              value={values.id}
              options={props.collectors || {}}
              onChange={(e) => setFieldValue('id', +e.target.value)}
            />

            <Button disabled={!isValid} loading={isSubmitting}>
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Modal>
  );
}
