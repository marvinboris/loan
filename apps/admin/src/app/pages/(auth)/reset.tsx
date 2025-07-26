import { Button, Card, Input, toastShow } from '@creditwave/ui-web';
import { Formik } from 'formik';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import z from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';
import { authService } from '../../services';

type FormValues = {
  password: string;
  passwordConfirmation: string;
};

export function Reset() {
  const [search] = useSearchParams();
  const navigate = useNavigate();

  const initialValues: FormValues = {
    password: '',
    passwordConfirmation: '',
  };

  const Schema = z.object({
    password: z.string().min(6),
    passwordConfirmation: z.string().min(6),
  });

  return (
    <Formik
      initialValues={initialValues}
      validate={toFormikValidate(Schema)}
      onSubmit={async ({ password }) => {
        const token = search.get('token');
        if (token) {
          const result = await authService.reset({
            password,
            token,
          });
          if (result.success) {
            toastShow({ type: 'success', text: result.message });
            navigate('/login');
          }
        } else toastShow({ type: 'error', text: 'No token provided' });
      }}
    >
      {({ values, errors, handleChange, handleSubmit, dirty, isValid }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (dirty && isValid) handleSubmit();
          }}
        >
          <Card className="flex flex-col gap-5">
            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="********"
              error={errors.password}
              value={values.password}
              onChange={handleChange('password')}
            />

            <Input
              type="password"
              placeholder="********"
              id="password-confirmation"
              label="Password confirmation"
              error={errors.passwordConfirmation}
              value={values.passwordConfirmation}
              onChange={handleChange('passwordConfirmation')}
            />

            <Button disabled={!isValid} type="submit">
              Reset password
            </Button>
          </Card>
        </form>
      )}
    </Formik>
  );
}
