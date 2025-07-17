import React from 'react';
import { Modal } from '../modal';
import { Formik } from 'formik';
import { Input } from '../form';
import { Button } from '../buttons';

type FormValues = {
  password: string;
  passwordConfirmation: string;
};

type ChangePasswordProps = {
  show: boolean;
  setShow: (show: boolean) => void;
};

export function ChangePassword({ show, setShow }: ChangePasswordProps) {
  const initialValues: FormValues = {
    password: '',
    passwordConfirmation: '',
  };

  return (
    <Modal title="Change password" show={show} setShow={setShow}>
      <Formik initialValues={initialValues} onSubmit={(data) => {}}>
        {({ values, errors, handleChange, handleSubmit, resetForm }) => (
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
              id="password"
              name="password"
              type="password"
              label="New password"
              error={errors.password}
              value={values.password}
              labelClassName="w-1/3 text-right"
              onChange={handleChange('password')}
            />

            <Input
              inline
              required
              type="password"
              label="Confirm password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              labelClassName="w-1/3 text-right"
              error={errors.passwordConfirmation}
              value={values.passwordConfirmation}
              onChange={handleChange('passwordConfirmation')}
            />

            <div className="flex justify-end gap-2.5 mt-10">
              <Button
                type="button"
                color="disabled"
                variant="outline"
                onClick={() => {
                  resetForm();
                  setShow(false);
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
