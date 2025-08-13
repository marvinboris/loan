import { Formik } from 'formik';
import React from 'react';
import { Button } from './buttons';
import { Card } from './card';
import { Modal } from './modal';
import { toastShow } from './toast';

export type CancelBorrowFormValues = {
  id: number;
};

export type CancelBorrowProps = {
  values: {
    id: number;

    mobile: string;
    name: string;
    amount: number;
  };
  onSubmit(
    values: CancelBorrowFormValues
  ): Promise<{ message: string; success: boolean }>;
};

export function CancelBorrow({ values, onSubmit }: CancelBorrowProps) {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <CancelBorrowForm
        values={values}
        show={show}
        setShow={setShow}
        onSubmit={onSubmit}
      />

      <Button onClick={() => setShow(true)}>Cancel borrow</Button>
    </>
  );
}

function CancelBorrowForm({
  show,
  setShow,
  values,
  onSubmit,
}: CancelBorrowProps & {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const initialValues: CancelBorrowFormValues = {
    id: values.id,
  };

  return (
    <Modal show={show} setShow={setShow} title="CancelBorrow validation form">
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

          <div>
            <div>Amount</div>
            <div>
              <span>{values.amount} XAF</span>
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
        {({ handleSubmit, values, isSubmitting }) => (
          <form
            className="flex flex-col gap-2.5"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input type="hidden" value={values.id} />

            <Button loading={isSubmitting}>Submit</Button>
          </form>
        )}
      </Formik>
    </Modal>
  );
}
