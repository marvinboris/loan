import { useTitle } from '@creditwave/hooks';
import {
  Button,
  FileInput,
  Form,
  NumberInput,
  Section,
  toastShow,
  Typography,
} from '@creditwave/ui';
import { router } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { borrowService } from '../../services';

export default function Page() {
  useTitle('Borrow');

  const initialValues: { amount: number; photo: string } = {
    amount: 0,
    photo: '',
  };

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
              id="amount"
              name="amount"
              label="Amount"
              value={values.amount}
              onChange={(amount) => setFieldValue('amount', amount)}
            />

            <Section borderless={false}>
              <Line label="Disbursement amount" amount={5850} />
              <Line label="Service fee" amount={3150} />
              <Line label="Interest" amount={63} />
              <Line label="Total" amount={9063} bold />
            </Section>

            <FileInput
              accept="image/*"
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
}

function Line({
  label,
  amount,
  bold,
}: {
  label: string;
  amount: number;
  bold?: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
      }}
    >
      <Typography family={bold ? 'BOLD' : undefined}>{label}</Typography>

      <Typography family="BOLD">{amount.toLocaleString('en')}</Typography>
    </View>
  );
}
