import {
  Button,
  Form,
  PinCodeInput,
  toastShow,
  Typography,
} from '@creditwave/ui';
import { router, useLocalSearchParams } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { Pressable } from 'react-native';
import { authService } from '../../services';

export default function Page() {
  const { mobile } = useLocalSearchParams<{ mobile: string }>();
  const [resending, setResending] = React.useState(false);

  const initialValues = {
    code: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (data) => {
        const result = await authService.verify({ ...data, mobile });
        if (result.token) router.navigate('/dashboard');
      }}
    >
      {({ values, handleChange, handleSubmit, resetForm, isSubmitting }) => (
        <Form>
          <PinCodeInput
            id="code"
            name="code"
            value={values.code}
            label="Verification code"
            onChange={handleChange('code')}
            description="Enter the code received via SMS"
          />

          <Button
            color="primary"
            title="Continue"
            loading={isSubmitting}
            onPress={() => handleSubmit()}
            containerStyle={{ marginVertical: 16 }}
          />

          <Pressable
            onPress={async () => {
              setResending(true);
              const result = await authService.login({ mobile });
              if (result.success) {
                toastShow({
                  type: 'success',
                  text: 'Verification code resent',
                });
                resetForm();
              }
              setResending(false);
            }}
          >
            <Typography underline align="center">
              {resending ? 'Resending...' : 'Resend code'}
            </Typography>
          </Pressable>
        </Form>
      )}
    </Formik>
  );
}
