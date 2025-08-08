import { useAuth, useTitle } from '@creditwave/hooks';
import {
  Button,
  Form,
  PhoneNumberInput,
  Section,
  Select,
  toastShow,
} from '@creditwave/ui';
import { router } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { ArrowDownTrayIcon } from 'react-native-heroicons/outline';
import z from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';
import { beneficiaryService } from '../../../../services';

export default function Page() {
  const { user } = useAuth();
  useTitle('Beneficiary account');

  const initialValues = {
    account: '',
    provider: '',
  };

  const Schema = React.useMemo(
    () =>
      z.object({
        account: z.string().nonempty(),
        provider: z.string().nonempty(),
      }),
    []
  );

  return (
    <Section subtitleText="Please fill the form below with the needed amount and your photo.">
      <Formik
        initialValues={initialValues}
        validate={toFormikValidate(Schema)}
        onSubmit={async (data) => {
          const result = await beneficiaryService.submit({
            ...data,
            mobile: user.mobile,
          });
          if (result.success) {
            router.navigate({
              pathname: '/beneficiary/verify',
              params: { account: data.account },
            });
            toastShow({ type: 'success', text: result.message });
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
            <PhoneNumberInput
              id="account"
              name="account"
              label="Phone number"
              value={values.account}
              onChange={handleChange('account')}
            />

            <Select
              id="provider"
              name="provider"
              value={values.provider}
              placeholder="Select a provider"
              onChange={handleChange('provider')}
              options={{
                mtn: 'MTN Cameroon',
                orange: 'Orange Cameroon',
              }}
            />

            <Button
              iconRight
              title="Save"
              loading={isSubmitting}
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
