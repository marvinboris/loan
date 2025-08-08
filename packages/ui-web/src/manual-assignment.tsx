import { cn } from '@creditwave/utils';
import { Formik } from 'formik';
import React from 'react';
import z from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';
import { Button } from './buttons';
import { Select } from './form';
import { Modal } from './modal';
import { toastShow } from './toast';

export type ManualAssignmentFormValues = {
  selected: number[];
  id: number;
};

export type ManualAssignmentProps = {
  selected: number[];
  telemarketers?: Record<string, string>;
  onSubmit(
    values: ManualAssignmentFormValues
  ): Promise<{ message: string; success: boolean }>;
};

export function ManualAssignment(props: ManualAssignmentProps) {
  const [show, setShow] = React.useState(false);

  return (
    <>
      {props.telemarketers && (
        <ManualAssignmentForm {...props} show={show} setShow={setShow} />
      )}

      <Button
        className={cn({ 'opacity-50': !props.selected.length })}
        onClick={props.selected.length ? () => setShow(true) : undefined}
      >
        Manual Assignment
      </Button>
    </>
  );
}

function ManualAssignmentForm(
  props: ManualAssignmentProps & {
    show: boolean;
    setShow: (show: boolean) => void;
  }
) {
  const initialValues: ManualAssignmentFormValues = {
    selected: props.selected,
    id: +Object.keys(props.telemarketers || {})[0],
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
    <Modal show={props.show} setShow={props.setShow} title="Manual assignment">
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
              options={props.telemarketers || {}}
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
