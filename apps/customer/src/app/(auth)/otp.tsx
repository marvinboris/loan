import { useRequest } from '@creditwave/hooks';
import {
  Button,
  Form,
  PinCodeInput,
  toastShow,
  Typography,
} from '@creditwave/ui';
import { router, useLocalSearchParams } from 'expo-router';
import { Formik } from 'formik';
import { Pressable } from 'react-native';
import { authService } from '../../services';

export default function Page() {
  const { mobile } = useLocalSearchParams<{ mobile: string }>();
  const { loading } = useRequest();

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
      {({ values, handleChange, handleSubmit, resetForm }) => (
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
            loading={loading}
            onPress={() => handleSubmit()}
            containerStyle={{ marginVertical: 16 }}
          />

          <Pressable
            onPress={async () => {
              const result = await authService.login({ mobile });
              if (result.success) {
                toastShow({
                  type: 'success',
                  text: 'Verification code resent',
                });
                resetForm();
              }
            }}
          >
            <Typography underline align="center">
              Resend code
            </Typography>
          </Pressable>
        </Form>
      )}
    </Formik>
  );
}
