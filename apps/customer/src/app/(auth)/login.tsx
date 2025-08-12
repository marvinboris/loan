import { Button, Form, PhoneNumberInput, toastShow } from '@creditwave/ui';
import { router } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { authService } from '../../services';

export default function Page() {
  const { t } = useTranslation();

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
      {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
        <Form>
          <PhoneNumberInput
            id="mobile"
            name="mobile"
            error={errors.mobile}
            value={values.mobile}
            placeholder="6XXXXXXXX"
            label={t('auth.login.mobile')}
            onChange={handleChange('mobile')}
          />

          <Button
            color="primary"
            loading={isSubmitting}
            onPress={() => handleSubmit()}
            title={t('auth.login.submit')}
            containerStyle={{ marginTop: 16 }}
          />
        </Form>
      )}
    </Formik>
  );
}
