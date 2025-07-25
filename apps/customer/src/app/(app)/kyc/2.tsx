import { Button, FileInput, Form, Section } from '@creditwave/ui';
import { kycState$ } from '@creditwave/utils';
import { router } from 'expo-router';
import { Formik } from 'formik';
import { ArrowRightIcon } from 'react-native-heroicons/outline';

export default function Page() {
  const initialValues: {
    backPhoto: string;
  } = {
    backPhoto: '',
  };

  return (
    <Section
      titleText="Document (Back)"
      subtitleText="Please upload your document below for completing your third step of KYC."
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(data) => {
          kycState$.backPhoto.set(data.backPhoto);
          router.navigate('/kyc/3');
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <Form>
            <FileInput
              accept="image/*"
              value={values.backPhoto}
              placeholder="Upload document back photo"
              onChange={(value) => setFieldValue('backPhoto', value)}
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
