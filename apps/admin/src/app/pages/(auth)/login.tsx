import { useRequest } from '@creditwave/hooks';
import { Button, Card, Input } from '@creditwave/ui-web';
import { Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import z from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';
import { authService } from '../../services';

type FormValues = {
  email: string;
  password: string;
};

export function Login() {
  const { clearError } = useRequest();

  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const Schema = z.object({
    email: z.string().email(),
    password: z.string().nonempty().min(6),
  });

  return (
    <Formik
      initialValues={initialValues}
      validate={toFormikValidate(Schema)}
      onSubmit={async (data) => {
        clearError();
        await authService.login(data);
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
              name="email"
              type="email"
              label="E-mail"
              error={errors.email}
              value={values.email}
              placeholder="admin@example.com"
              onChange={handleChange('email')}
            />

            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="********"
              error={errors.password}
              value={values.password}
              onChange={handleChange('password')}
            />

            <Button disabled={!isValid} loading={isSubmitting} type="submit">
              Sign In
            </Button>

            <div>
              <Link to="/forgot" className="underline text-sm">
                Forgot password?
              </Link>
            </div>
          </Card>
        </form>
      )}
    </Formik>
  );
}
