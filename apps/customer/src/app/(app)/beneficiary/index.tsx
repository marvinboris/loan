import { useAuth, useTitle } from '@creditwave/hooks';
import {
  Button,
  Form,
  PhoneNumberInput,
  Section,
  Select,
  toastShow,
} from '@creditwave/ui';
import { router } from 'expo-router';
import { Formik } from 'formik';
import { ArrowDownTrayIcon } from 'react-native-heroicons/outline';
import { beneficiaryService } from '../../../services';

export default function Page() {
  const { user } = useAuth();
  useTitle('Beneficiary account');

  const initialValues = {
    account: '',
    provider: '',
  };

  return (
    <Section subtitleText="Please fill the form below with the needed amount and your photo.">
      <Formik
        initialValues={initialValues}
        onSubmit={async (data) => {
          const result = await beneficiaryService.submit({
            ...data,
            mobile: user.mobile,
          });
          if (result.success) {
            router.navigate({
              pathname: '/beneficiary/verify',
              params: { account: data.account },
            });
            toastShow({ type: 'success', text: result.message });
          }
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <Form>
            <PhoneNumberInput
              id="account"
              name="account"
              label="Phone number"
              value={values.account}
              onChange={handleChange('account')}
            />

            <Select
              id="provider"
              name="provider"
              value={values.provider}
              placeholder="Select a provider"
              onChange={handleChange('provider')}
              options={{
                mtn: 'MTN Cameroon',
                orange: 'Orange Cameroon',
              }}
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
