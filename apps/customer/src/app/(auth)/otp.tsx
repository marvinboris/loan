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
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { authService } from '../../services';

export default function Page() {
  const { t } = useTranslation();

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
            label={t('auth.otp.code')}
            onChange={handleChange('code')}
            description={t('auth.otp.description')}
          />

          <Button
            color="primary"
            loading={isSubmitting}
            title={t('auth.otp.continue')}
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
                  text: t('auth.otp.code_resent'),
                });
                resetForm();
              }
              setResending(false);
            }}
          >
            <Typography underline align="center">
              {t(resending ? 'auth.otp.resending' : 'auth.otp.resend_code')}
            </Typography>
          </Pressable>
        </Form>
      )}
    </Formik>
  );
}
