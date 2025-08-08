import { Button, EmailInput, Form, PasswordInput } from '@creditwave/ui';
import { Formik } from 'formik';
import React from 'react';
import { authService } from '../../services';

export default function Page() {
  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <Formik initialValues={initialValues} onSubmit={authService.login}>
      {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
        <Form>
          <EmailInput
            id="email"
            name="email"
            label="E-mail"
            error={errors.email}
            value={values.email}
            onChange={handleChange('email')}
            placeholder="collector@creditwave.com"
          />

          <PasswordInput
            id="password"
            name="password"
            label="Password"
            placeholder="********"
            error={errors.password}
            value={values.password}
            onChange={handleChange('password')}
          />

          <Button
            color="primary"
            title="Sign in"
            loading={isSubmitting}
            onPress={() => handleSubmit()}
            containerStyle={{ marginTop: 16 }}
          />
        </Form>
      )}
    </Formik>
  );
}
