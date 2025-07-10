import { Button, Card, Input } from '@creditwave/ui';
import { Formik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

type FormValues = {
  email: string;
};

export function Forgot() {
  const navigate = useNavigate();

  const initialValues: FormValues = {
    email: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={({ email }, { resetForm }) => {
        console.log(email);
        navigate('/reset');
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

            <div className="flex justify-center gap-4">
              <Link to="/login">
                <Button type="button" variant="clear">
                  Cancel
                </Button>
              </Link>

              <Button disabled={!isValid} type="submit">
                Reset Password
              </Button>
            </div>
          </Card>
        </form>
      )}
    </Formik>
  );
}
