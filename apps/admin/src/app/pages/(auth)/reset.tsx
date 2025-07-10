import { Button, Card, Input } from '@creditwave/ui';
import { Formik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

type FormValues = {
  password: string;
  passwordConfirmation: string;
};

export function Reset() {
  const navigate = useNavigate();

  const initialValues: FormValues = {
    password: '',
    passwordConfirmation: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={({ password, passwordConfirmation }, { resetForm }) => {
        console.log(password, passwordConfirmation);
        navigate('/login');
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
