import { Button, FileInput, Form, Section } from '@creditwave/ui';
import { KycState, kycState$ } from '@creditwave/utils';
import { router } from 'expo-router';
import { Formik } from 'formik';
import { ArrowUpOnSquareStackIcon } from 'react-native-heroicons/outline';
import { kycService } from '../../../services';

export default function Page() {
  const initialValues: {
    selfie: string;
  } = {
    selfie: '',
  };

  return (
    <Section titleText="Photo" subtitleText="Please upload your photo.">
      <Formik
        initialValues={initialValues}
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
        {({ handleSubmit, setFieldValue, values }) => (
          <Form>
            <FileInput
              accept="image/*"
              value={values.selfie}
              placeholder="Upload your photo"
              onChange={(value) => setFieldValue('selfie', value)}
            />

            <Button
              iconRight
              title="Submit"
              icon={ArrowUpOnSquareStackIcon}
              onPress={() => handleSubmit()}
              containerStyle={{ alignItems: 'center' }}
            />
          </Form>
        )}
      </Formik>
    </Section>
  );
}
