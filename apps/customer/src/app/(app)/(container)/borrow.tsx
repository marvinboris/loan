import { useApi, useTitle } from '@creditwave/hooks';
import {
  AmountLine,
  Button,
  Form,
  ImageInput,
  NumberInput,
  Section,
  toastShow,
} from '@creditwave/ui';
import { router } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { toFormikValidate } from 'zod-formik-adapter';
import z from 'zod';
import { borrowService } from '../../../services';

export default function Page() {
  const { t } = useTranslation();

  useTitle(t('borrow.title'));

  const { data, loading, refetch } = useApi<{
    success: boolean;
    hasKyc: boolean;
    hasAccount: boolean;
    maxAmount: number;
  }>('/customer/borrow');

  const initialValues = {
    amount: 0,
    photo: '',
  };

  const Schema = React.useMemo(
    () =>
      z.object({
        amount: z
          .number()
          .positive()
          .max(data?.maxAmount || 10000),
        photo: z.string().nonempty(),
      }),
    [data?.maxAmount]
  );

  React.useEffect(() => {
    if (data?.success) {
      if (!data.hasKyc) return router.navigate('/kyc');
      if (!data.hasAccount) router.navigate('/beneficiary');
    }
  }, [data]);

  if (loading) return <ActivityIndicator size="large" />;

  if (data?.hasKyc && data?.hasAccount)
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
      >
        <Section subtitleText={t('borrow.subtitle')}>
          <Formik
            initialValues={initialValues}
            validate={toFormikValidate(Schema)}
            onSubmit={async (data) => {
              const result = await borrowService.submit(data);
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
              handleSubmit,
              setFieldValue,
              values,
              dirty,
              isValid,
              isSubmitting,
            }) => (
              <Form>
                <NumberInput
                  min={0}
                  id="amount"
                  step={1000}
                  name="amount"
                  max={data.maxAmount}
                  value={values.amount}
                  label={t('borrow.amount')}
                  onChange={(amount) => setFieldValue('amount', amount)}
                />

                <Section borderless={false}>
                  <AmountLine
                    amount={values.amount * 0.7}
                    label={t('borrow.disbursement_amount')}
                  />
                  <AmountLine
                    amount={values.amount * 0.25}
                    label={t('borrow.service_fee')}
                  />
                  <AmountLine
                    label={t('borrow.interest')}
                    amount={values.amount * 0.05}
                  />
                  <AmountLine
                    label={t('borrow.total')}
                    amount={values.amount}
                    bold
                  />
                </Section>

                <ImageInput
                  aspect={[1, 1]}
                  value={values.photo}
                  placeholder={t('borrow.photo')}
                  onChange={(photo) => setFieldValue('photo', photo)}
                />

                <Button
                  loading={isSubmitting}
                  title={t('borrow.confirm')}
                  disabled={!(dirty && isValid)}
                  onPress={() => handleSubmit()}
                />
              </Form>
            )}
          </Formik>
        </Section>
      </ScrollView>
    );

  return null;
}
