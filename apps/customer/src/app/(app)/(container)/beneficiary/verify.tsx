import { useAuth } from '@creditwave/hooks';
import { Button, Form, PinCodeInput, Section, toastShow } from '@creditwave/ui';
import { router, useLocalSearchParams } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDownTrayIcon } from 'react-native-heroicons/outline';
import z from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';
import { beneficiaryService } from '../../../../services';

export default function Page() {
  const { t } = useTranslation();

  const { user } = useAuth();
  const { account } = useLocalSearchParams<{ account: string }>();

  const initialValues = {
    code: '',
  };

  const Schema = React.useMemo(
    () =>
      z.object({
        code: z.string().length(6),
      }),
    []
  );

  return (
    <Section subtitleText={t('beneficiary.verify')}>
      <Formik
        initialValues={initialValues}
        validate={toFormikValidate(Schema)}
        onSubmit={async (data) => {
          const result = await beneficiaryService.verify({
            ...data,
            account,
            mobile: user.mobile,
          });
          if (result.success) {
            router.push('/dashboard');
            toastShow({
              type: 'success',
              text: result.message,
            });
          }
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          dirty,
          isValid,
          isSubmitting,
        }) => (
          <Form>
            <PinCodeInput
              id="code"
              name="code"
              value={values.code}
              onChange={handleChange('code')}
            />

            <Button
              iconRight
              loading={isSubmitting}
              icon={ArrowDownTrayIcon}
              title={t('beneficiary.save')}
              disabled={!(dirty && isValid)}
              onPress={() => handleSubmit()}
            />
          </Form>
        )}
      </Formik>
    </Section>
  );
}
