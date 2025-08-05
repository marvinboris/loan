import { Button, Form, ImageInput, Section } from '@creditwave/ui';
import { kycState$ } from '@creditwave/utils';
import { router } from 'expo-router';
import { Formik } from 'formik';
import { ArrowRightIcon } from 'react-native-heroicons/outline';

export default function Page() {
  const initialValues: {
    frontPhoto: string;
  } = {
    frontPhoto: '',
  };

  return (
    <Section
      titleText="Document (Front)"
      subtitleText="Please upload your document below for completing your second step of KYC."
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(data) => {
          kycState$.frontPhoto.set(data.frontPhoto);
          router.navigate('/kyc/2');
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => (
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
              onPress={() => handleSubmit()}
              containerStyle={{ alignItems: 'center' }}
            />
          </Form>
        )}
      </Formik>
    </Section>
  );
}
