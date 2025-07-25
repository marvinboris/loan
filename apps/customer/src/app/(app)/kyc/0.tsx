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
import { ArrowRightIcon } from 'react-native-heroicons/outline';

export default function Page() {
  const initialValues: {
    firstName?: string;
    lastName: string;
    location: string;
    birthdate: string;
    emergencyNumber1: string;
    emergencyNumber2?: string;
  } = {
    lastName: '',
    location: '',
    birthdate: '',
    emergencyNumber1: '',
  };

  return (
    <Section
      titleText="Personal info"
      subtitleText="Please fill the form below with your personal information."
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(data) => {
          kycState$.assign(data);
          router.navigate('/kyc/1');
        }}
      >
        {({ errors, handleChange, handleSubmit, values }) => (
          <Form>
            <TextInput
              id="firstName"
              name="firstName"
              label="First name"
              error={errors.firstName}
              value={values.firstName}
              onChange={handleChange('firstName')}
            />

            <TextInput
              required
              id="lastName"
              name="lastName"
              label="Last name"
              error={errors.lastName}
              value={values.lastName}
              onChange={handleChange('lastName')}
            />

            <TextInput
              required
              id="location"
              name="location"
              label="Location"
              error={errors.location}
              value={values.location}
              onChange={handleChange('location')}
            />

            <DateInput
              required
              id="birthdate"
              name="birthdate"
              label="Birthdate"
              error={errors.birthdate}
              value={values.birthdate}
              onChange={handleChange('birthdate')}
            />

            <PhoneNumberInput
              required
              id="emergencyNumber1"
              name="emergencyNumber1"
              label="Emergency number #1"
              error={errors.emergencyNumber1}
              value={values.emergencyNumber1}
              onChange={handleChange('emergencyNumber1')}
            />

            <PhoneNumberInput
              id="emergencyNumber2"
              name="emergencyNumber2"
              label="Emergency number #2"
              error={errors.emergencyNumber2}
              value={values.emergencyNumber2}
              onChange={handleChange('emergencyNumber2')}
            />

            <Button
              iconRight
              title="Next"
              icon={ArrowRightIcon}
              onPress={() => handleSubmit()}
              containerStyle={{ alignItems: 'center' }}
            />
          </Form>
        )}
      </Formik>
    </Section>
  );
}
