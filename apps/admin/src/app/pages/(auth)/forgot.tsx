import { Button, Card, Input, toastShow } from '@creditwave/ui-web';
import { Formik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import z from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';
import { authService } from '../../services';

type FormValues = {
  email: string;
};

export function Forgot() {
  const navigate = useNavigate();

  const initialValues: FormValues = {
    email: '',
  };

  const Schema = z.object({
    email: z.string().email(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validate={toFormikValidate(Schema)}
      onSubmit={async (data) => {
        const result = await authService.forgot(data);
        if (result.success) {
          toastShow({ type: 'success', text: result.message });
          navigate('/login');
        }
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
        dirty,
        isValid,
        isSubmitting,
      }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (dirty && isValid) handleSubmit();
          }}
        >
          <Card className="flex flex-col gap-5">
            <Input
              id="email"
              type="email"
              label="E-mail"
              error={errors.email}
              value={values.email}
              placeholder="admin@example.com"
              onChange={handleChange('email')}
            />

            <div className="flex justify-center gap-4">
              <Link to="/login">
                <Button type="button" variant="clear">
                  Cancel
                </Button>
              </Link>

              <Button disabled={!isValid} loading={isSubmitting} type="submit">
                Reset Password
              </Button>
            </div>
          </Card>
        </form>
      )}
    </Formik>
  );
}
