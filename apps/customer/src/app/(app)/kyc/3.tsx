import { Button, Form, ImageInput, Section } from '@creditwave/ui';
import { KycState, kycState$ } from '@creditwave/utils';
import { router } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeftIcon,
  ArrowUpOnSquareStackIcon,
} from 'react-native-heroicons/outline';
import z from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';
import { kycService } from '../../../services';

export default function Page() {
  const { t } = useTranslation();

  const initialValues: {
    selfie: string;
  } = {
    selfie: '',
  };

  const Schema = React.useMemo(
    () =>
      z.object({
        selfie: z.string().nonempty(),
      }),
    []
  );

  return (
    <Section
      titleText={t('kyc.photo.title')}
      subtitleText={t('kyc.photo.subtitle')}
    >
      <Formik
        initialValues={initialValues}
        validate={toFormikValidate(Schema)}
        onSubmit={async (data) => {
          const form = kycState$.get() as KycState;
          const result = await kycService.submit({
            ...form,
            ...data,
          });
          if (result.success) {
            router.push('/kyc/completed');
            kycState$.delete();
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
            <ImageInput
              aspect={[1, 1]}
              value={values.selfie}
              placeholder={t('kyc.selfie')}
              onChange={(value) => setFieldValue('selfie', value)}
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
                loading={isSubmitting}
                title={t('kyc.submit')}
                disabled={!(dirty && isValid)}
                onPress={() => handleSubmit()}
                icon={ArrowUpOnSquareStackIcon}
              />
            </View>
          </Form>
        )}
      </Formik>
    </Section>
  );
}
