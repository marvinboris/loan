import { useAuth, useRequest } from '@creditwave/hooks';
import { Button, Form, PinCodeInput, Section, toastShow } from '@creditwave/ui';
import { router, useLocalSearchParams } from 'expo-router';
import { Formik } from 'formik';
import { ArrowDownTrayIcon } from 'react-native-heroicons/outline';
import { beneficiaryService } from '../../../../services';
import React from 'react';
import z from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';

export default function Page() {
  const { user } = useAuth();
  const { loading } = useRequest();
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
    <Section subtitleText="Please enter the verification code received via SMS to register the new beneficiary.">
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
        {({ handleChange, handleSubmit, values, dirty, isValid }) => (
          <Form>
            <PinCodeInput
              id="code"
              name="code"
              value={values.code}
              onChange={handleChange('code')}
            />

            <Button
              iconRight
              title="Save"
              loading={loading}
              icon={ArrowDownTrayIcon}
              disabled={!(dirty && isValid)}
              onPress={() => handleSubmit()}
            />
          </Form>
        )}
      </Formik>
    </Section>
  );
}
