import { Formik } from 'formik';
import React from 'react';
import { Button } from '../buttons';
import { Input } from '../form';
import { Modal } from '../modal';

export type ChangePasswordFormValues = {
  password: string;
  passwordConfirmation: string;
};

type ChangePasswordProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  onSubmit(data: ChangePasswordFormValues): void;
};

export function ChangePassword({
  show,
  setShow,
  onSubmit,
}: ChangePasswordProps) {
  const initialValues: ChangePasswordFormValues = {
    password: '',
    passwordConfirmation: '',
  };

  return (
    <Modal title="Change password" show={show} setShow={setShow}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          resetForm,
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

              <Button loading={isSubmitting}>Confirm</Button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
}
