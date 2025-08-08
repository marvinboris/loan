import { cn } from '@creditwave/utils';
import { Formik } from 'formik';
import React from 'react';
import z from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';
import { Button } from './buttons';
import { Modal } from './modal';
import { toastShow } from './toast';

export type ReleaseFormValues = {
  selected: number[];
};

export type ReleaseProps = {
  selected: number[];
  onSubmit(
    values: ReleaseFormValues
  ): Promise<{ message: string; success: boolean }>;
};

export function Release(props: ReleaseProps) {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <ReleaseForm {...props} show={show} setShow={setShow} />

      <Button
        className={cn({ 'opacity-50': !props.selected.length })}
        onClick={props.selected.length ? () => setShow(true) : undefined}
      >
        Release
      </Button>
    </>
  );
}

function ReleaseForm(
  props: ReleaseProps & {
    show: boolean;
    setShow: (show: boolean) => void;
  }
) {
  const initialValues: ReleaseFormValues = {
    selected: props.selected,
  };

  const Schema = React.useMemo(
    () =>
      z.object({
        selected: z.array(z.number()),
      }),
    []
  );

  return (
    <Modal show={props.show} setShow={props.setShow} title="Release">
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
        {({ handleSubmit, isValid }) => (
          <form
            className="flex flex-col gap-2.5"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="text-center">
              Are you sure you want to release the selected client(s) ?
            </div>

            <Button disabled={!isValid}>Submit</Button>
          </form>
        )}
      </Formik>
    </Modal>
  );
}
