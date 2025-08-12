import { Button, Form, ImageInput, Section } from '@creditwave/ui';
import { kycState$ } from '@creditwave/utils';
import { router } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ArrowLeftIcon, ArrowRightIcon } from 'react-native-heroicons/outline';
import z from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';

export default function Page() {
  const { t } = useTranslation();

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
      titleText={t('kyc.front_id.title')}
      subtitleText={t('kyc.front_id.subtitle')}
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
              placeholder={t('kyc.front_photo')}
              onChange={(value) => setFieldValue('frontPhoto', value)}
            />

            <View
              style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}
            >
              <Button
                type="clear"
                icon={ArrowLeftIcon}
                title={t('kyc.back')}
                onPress={() => router.back()}
              />

              <Button
                iconRight
                icon={ArrowRightIcon}
                title={t('kyc.next')}
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
