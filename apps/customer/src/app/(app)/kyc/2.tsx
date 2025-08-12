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
      titleText={t('kyc.back_id.title')}
      subtitleText={t('kyc.back_id.subtitle')}
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
              placeholder={t('kyc.back_photo')}
              onChange={(value) => setFieldValue('backPhoto', value)}
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
