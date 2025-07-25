import { useRequest } from '@creditwave/hooks';
import { Button, Form, PhoneNumberInput, toastShow } from '@creditwave/ui';
import { router } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { authService } from '../../services';

export default function Page() {
  const { loading } = useRequest();

  const initialValues = {
    mobile: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (data) => {
        const result = await authService.login(data);
        if (result.success) {
          toastShow({ type: 'success', text: result.message });
          router.push({
            pathname: '/otp',
            params: { mobile: result.mobile },
          });
        }
      }}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <Form>
          <PhoneNumberInput
            id="mobile"
            name="mobile"
            label="Phone number"
            error={errors.mobile}
            value={values.mobile}
            placeholder="6XXXXXXXX"
            onChange={handleChange('mobile')}
          />

          <Button
            color="primary"
            loading={loading}
            title="Sign in / Sign up"
            onPress={() => handleSubmit()}
            containerStyle={{ marginTop: 16 }}
          />
        </Form>
      )}
    </Formik>
  );
}
