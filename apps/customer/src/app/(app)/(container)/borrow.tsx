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
import { ActivityIndicator } from 'react-native';
import { borrowService } from '../../../services';

export default function Page() {
  useTitle('Borrow');

  const { data, loading } = useApi<{
    success: boolean;
    hasKyc: boolean;
    hasAccount: boolean;
    maxAmount: number;
  }>('/customer/borrow');

  const initialValues = {
    amount: 0,
    photo: '',
  };

  React.useEffect(() => {
    if (data?.success) {
      if (!data.hasKyc) return router.navigate('/kyc');
      if (!data.hasAccount) router.navigate('/beneficiary');
    }
  }, [data]);

  if (loading) return <ActivityIndicator size="large" />;

  if (data?.hasKyc && data?.hasAccount)
    return (
      <Section subtitleText="Please fill the form below with the needed amount and your photo.">
        <Formik
          initialValues={initialValues}
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
          {({ handleSubmit, setFieldValue, values }) => (
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
                <AmountLine label="Service fee" amount={values.amount * 0.25} />
                <AmountLine label="Interest" amount={values.amount * 0.05} />
                <AmountLine label="Total" amount={values.amount} bold />
              </Section>

              <ImageInput
                value={values.photo}
                placeholder="Upload your photo"
                onChange={(photo) => setFieldValue('photo', photo)}
              />

              <Button title="Confirm" onPress={() => handleSubmit()} />
            </Form>
          )}
        </Formik>
      </Section>
    );

  return null;
}
