import {
  Button,
  DateInput,
  Form,
  PhoneNumberInput,
  Section,
  TextInput,
} from '@creditwave/ui';
import { kycState$ } from '@creditwave/utils';
import { router } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import z from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';

export default function Page() {
  const { t } = useTranslation();

  const initialValues: {
    firstName?: string;
    lastName: string;
    location: string;
    birthdate: string;
    emergencyNumber1: string;
    emergencyNumber2?: string;
  } = React.useMemo(
    () =>
      kycState$.get() || {
        lastName: '',
        location: '',
        birthdate: '',
        emergencyNumber1: '',
      },
    []
  );

  const Schema = React.useMemo(
    () =>
      z.object({
        firstName: z.string().optional(),
        lastName: z.string().nonempty(),
        location: z.string().nonempty(),
        birthdate: z.string().date(),
        emergencyNumber1: z.string().nonempty(),
        emergencyNumber2: z.string().optional(),
      }),
    []
  );

  return (
    <Section
      titleText={t('kyc.personal_info.title')}
      subtitleText={t('kyc.personal_info.subtitle')}
    >
      <Formik
        initialValues={initialValues}
        validate={toFormikValidate(Schema)}
        onSubmit={(data) => {
          kycState$.assign(data);
          router.navigate('/kyc/1');
        }}
      >
        {({ errors, handleChange, handleSubmit, values, isValid }) => (
          <Form>
            <TextInput
              id="firstName"
              name="firstName"
              error={errors.firstName}
              value={values.firstName}
              label={t('kyc.first_name')}
              onChange={handleChange('firstName')}
            />

            <TextInput
              required
              id="lastName"
              name="lastName"
              error={errors.lastName}
              value={values.lastName}
              label={t('kyc.last_name')}
              onChange={handleChange('lastName')}
            />

            <TextInput
              required
              id="location"
              name="location"
              error={errors.location}
              value={values.location}
              label={t('kyc.location')}
              onChange={handleChange('location')}
            />

            <DateInput
              required
              id="birthdate"
              name="birthdate"
              error={errors.birthdate}
              value={values.birthdate}
              label={t('kyc.birthdate')}
              onChange={handleChange('birthdate')}
            />

            <PhoneNumberInput
              required
              id="emergencyNumber1"
              name="emergencyNumber1"
              error={errors.emergencyNumber1}
              value={values.emergencyNumber1}
              label={t('kyc.emergency_number_1')}
              onChange={handleChange('emergencyNumber1')}
            />

            <PhoneNumberInput
              id="emergencyNumber2"
              name="emergencyNumber2"
              error={errors.emergencyNumber2}
              value={values.emergencyNumber2}
              label={t('kyc.emergency_number_2')}
              onChange={handleChange('emergencyNumber2')}
            />

            <Button
              iconRight
              disabled={!isValid}
              icon={ArrowRightIcon}
              title={t('kyc.next')}
              onPress={() => handleSubmit()}
              containerStyle={{ alignItems: 'center' }}
            />
          </Form>
        )}
      </Formik>
    </Section>
  );
}
