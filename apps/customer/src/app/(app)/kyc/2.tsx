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
    backPhoto: string;
  } = {
    backPhoto: '',
  };

  const Schema = React.useMemo(
    () =>
      z.object({
        backPhoto: z.string().nonempty(),
      }),
    []
  );

  return (
    <Section
      titleText="Document (Back)"
      subtitleText="Please upload your document below for completing your third step of KYC."
    >
      <Formik
        initialValues={initialValues}
        validate={toFormikValidate(Schema)}
        onSubmit={(data) => {
          kycState$.backPhoto.set(data.backPhoto);
          router.navigate('/kyc/3');
        }}
      >
        {({ handleSubmit, setFieldValue, values, dirty, isValid }) => (
          <Form>
            <ImageInput
              value={values.backPhoto}
              placeholder="Upload document back photo"
              onChange={(value) => setFieldValue('backPhoto', value)}
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
