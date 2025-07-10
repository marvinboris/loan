import { Button, Card, Input } from '@creditwave/ui';
import { Formik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

type FormValues = {
  email: string;
  password: string;
};

export function Login() {
  const navigate = useNavigate();

  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={({ email, password }, { resetForm }) => {
        console.log(email, password);
        navigate('/');
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
              id="email"
              type="email"
              label="E-mail"
              error={errors.email}
              value={values.email}
              placeholder="admin@example.com"
              onChange={handleChange('email')}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="********"
              error={errors.password}
              value={values.password}
              onChange={handleChange('password')}
            />

            <Button disabled={!isValid} type="submit">
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
