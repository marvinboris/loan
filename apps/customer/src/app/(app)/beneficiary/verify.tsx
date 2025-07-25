import { useAuth } from '@creditwave/hooks';
import { Button, Form, PinCodeInput, Section, toastShow } from '@creditwave/ui';
import { router, useLocalSearchParams } from 'expo-router';
import { Formik } from 'formik';
import { ArrowDownTrayIcon } from 'react-native-heroicons/outline';
import { beneficiaryService } from '../../../services';

export default function Page() {
  const { user } = useAuth();
  const { account } = useLocalSearchParams<{ account: string }>();

  const initialValues = {
    code: '',
  };

  return (
    <Section subtitleText="Please enter the verification code received via SMS to register the new beneficiary.">
      <Formik
        initialValues={initialValues}
        onSubmit={async (data) => {
          const result = await beneficiaryService.verify({
            ...data,
            account,
            mobile: user.mobile,
          });
          if (result.success) {
            router.push('/dashboard');
            toastShow({
              type: 'success',
              text: result.message,
            });
          }
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <Form>
            <PinCodeInput
              id="code"
              name="code"
              value={values.code}
              onChange={handleChange('code')}
            />

            <Button
              iconRight
              title="Save"
              icon={ArrowDownTrayIcon}
              onPress={() => handleSubmit()}
            />
          </Form>
        )}
      </Formik>
    </Section>
  );
}
