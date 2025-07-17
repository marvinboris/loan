import { useRequest } from '@creditwave/hooks';
import { Button, Form, PhoneNumberInput } from '@creditwave/ui';
import { Formik } from 'formik';
import React from 'react';
import { authService } from '../../services';

export default function Page() {
  const { loading } = useRequest();

  const initialValues = {
    phone: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (data) => {
        await authService.login(data);
      }}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <Form>
          <PhoneNumberInput
            id="phone"
            name="phone"
            error={errors.phone}
            value={values.phone}
            placeholder="6XXXXXXXX"
            onChange={handleChange('phone')}
          />

          <Button
            color="primary"
            loading={loading}
            title="Sign in / Sign up"
            onPress={() => handleSubmit()}
          />
        </Form>
      )}
    </Formik>
  );
}
