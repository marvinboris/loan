import { Formik } from 'formik';
import React from 'react';
import { Button } from './buttons';
import { Card } from './card';
import { Switch, TextArea } from './form';
import { Modal } from './modal';
import { toastShow } from './toast';

export type BorrowFormValues = {
  id: number;
  validated: boolean;
  reason?: string;
};

export type BorrowProps = {
  values: {
    id: number;

    mobile: string;
    name: string;
  };
  onSubmit(
    values: BorrowFormValues
  ): Promise<{ message: string; success: boolean }>;
};

export function Borrow({ values, onSubmit }: BorrowProps) {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <BorrowForm
        values={values}
        show={show}
        setShow={setShow}
        onSubmit={onSubmit}
      />

      <Button onClick={() => setShow(true)}>Borrow</Button>
    </>
  );
}

function BorrowForm({
  show,
  setShow,
  values,
  onSubmit,
}: BorrowProps & {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const initialValues: BorrowFormValues = {
    id: values.id,
    validated: false,
  };

  return (
    <Modal show={show} setShow={setShow} title="Borrow validation form">
      <Card className="mb-2.5">
        <div className="*:flex *:justify-between *:*:*:last:font-bold">
          <div>
            <div>Name</div>
            <div>
              <span>{values.name}</span>
            </div>
          </div>

          <div>
            <div>Mobile</div>
            <div>
              <span>{values.mobile}</span>
            </div>
          </div>
        </div>
      </Card>

      <Formik
        initialValues={initialValues}
        onSubmit={async (data) => {
          const result = await onSubmit(data);
          if (result.success) {
            toastShow({ type: 'success', text: result.message });
            setShow(false);
          }
        }}
      >
        {({
          handleChange,
          handleSubmit,
          setFieldValue,
          values,
          isSubmitting,
        }) => (
          <form
            className="flex flex-col gap-2.5"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input type="hidden" value={values.id} />

            <Switch
              label="Validate ?"
              checked={values.validated}
              onChange={(value) => setFieldValue('validated', value)}
            />

            <TextArea
              label="Reason for denying"
              value={values.reason}
              onChange={handleChange('reason')}
            />

            <Button loading={isSubmitting}>Submit</Button>
          </form>
        )}
      </Formik>
    </Modal>
  );
}
