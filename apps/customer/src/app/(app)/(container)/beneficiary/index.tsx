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
import { useTranslation } from 'react-i18next';
import { ArrowDownTrayIcon } from 'react-native-heroicons/outline';
import z from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';
import { beneficiaryService } from '../../../../services';

export default function Page() {
  const { t } = useTranslation();

  const { user } = useAuth();
  useTitle(t('beneficiary.title'));

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
    <Section subtitleText={t('beneficiary.subtitle')}>
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
              value={values.account}
              label={t('beneficiary.account')}
              onChange={handleChange('account')}
            />

            <Select
              id="provider"
              name="provider"
              value={values.provider}
              onChange={handleChange('provider')}
              placeholder={t('beneficiary.provider.placeholder')}
              options={{
                mtn: t('beneficiary.provider.mtn'),
                orange: t('beneficiary.provider.orange'),
              }}
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
