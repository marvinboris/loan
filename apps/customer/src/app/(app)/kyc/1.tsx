import { Button, Form, ImageInput, Section } from '@creditwave/ui';
import { kycState$ } from '@creditwave/utils';
import { router } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { ArrowLeftIcon, ArrowRightIcon } from 'react-native-heroicons/outline';
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

            <View
              style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}
            >
              <Button
                title="Back"
                type="clear"
                icon={ArrowLeftIcon}
                onPress={() => router.back()}
              />

              <Button
                iconRight
                title="Next"
                icon={ArrowRightIcon}
                disabled={!(dirty && isValid)}
                onPress={() => handleSubmit()}
              />
            </View>
          </Form>
        )}
      </Formik>
    </Section>
  );
}
