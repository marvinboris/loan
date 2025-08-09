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
import { ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { toFormikValidate } from 'zod-formik-adapter';
import z from 'zod';
import { borrowService } from '../../../services';

export default function Page() {
  useTitle('Borrow');

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
        <Section subtitleText="Please fill the form below with the needed amount and your photo.">
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
                  label="Amount"
                  max={data.maxAmount}
                  value={values.amount}
                  onChange={(amount) => setFieldValue('amount', amount)}
                />

                <Section borderless={false}>
                  <AmountLine
                    label="Disbursement amount"
                    amount={values.amount * 0.7}
                  />
                  <AmountLine
                    label="Service fee"
                    amount={values.amount * 0.25}
                  />
                  <AmountLine label="Interest" amount={values.amount * 0.05} />
                  <AmountLine label="Total" amount={values.amount} bold />
                </Section>

                <ImageInput
                  aspect={[1, 1]}
                  value={values.photo}
                  placeholder="Upload your photo"
                  onChange={(photo) => setFieldValue('photo', photo)}
                />

                <Button
                  title="Confirm"
                  loading={isSubmitting}
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
