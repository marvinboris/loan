import { Button, Form, ImageInput, Section } from '@creditwave/ui';
import { kycState$ } from '@creditwave/utils';
import { router } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import z from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';

export default function Page() {
  const initialValues: {
    frontPhoto: string;
  } = {
    frontPhoto: '',
  };

  const Schema = React.useMemo(
    () =>
      z.object({
        frontPhoto: z.string().nonempty(),
      }),
    []
  );

  return (
    <Section
      titleText="Document (Front)"
      subtitleText="Please upload your document below for completing your second step of KYC."
    >
      <Formik
        initialValues={initialValues}
        validate={toFormikValidate(Schema)}
        onSubmit={(data) => {
          kycState$.frontPhoto.set(data.frontPhoto);
          router.navigate('/kyc/2');
        }}
      >
        {({ handleSubmit, setFieldValue, values, dirty, isValid }) => (
          <Form>
            <ImageInput
              value={values.frontPhoto}
              placeholder="Upload document front photo"
              onChange={(value) => setFieldValue('frontPhoto', value)}
            />

            <Button
              iconRight
              title="Next"
              icon={ArrowRightIcon}
              disabled={!(dirty && isValid)}
              onPress={() => handleSubmit()}
              containerStyle={{ alignItems: 'center' }}
            />
          </Form>
        )}
      </Formik>
    </Section>
  );
}
