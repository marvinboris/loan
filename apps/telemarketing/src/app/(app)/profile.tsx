import { useTitle } from '@creditwave/hooks';
import {
  Button,
  Form,
  PasswordInput,
  Section,
  toastShow,
} from '@creditwave/ui';
import { Formik } from 'formik';
import { authService } from '../../services';

export default function Page() {
  useTitle('Profile');

  const initialValues = {
    oldPassword: '',
    password: '',
    passwordConfirmation: '',
  };

  return (
    <Section subtitleText="Fill the form below to change your account password">
      <Formik
        initialValues={initialValues}
        onSubmit={async (data, { resetForm }) => {
          const result = await authService.changePassword(data);
          if (result.success) {
            toastShow({ type: 'success', text: result.message });
            resetForm();
          }
        }}
      >
        {({ errors, handleChange, handleSubmit, values }) => (
          <Form>
            <PasswordInput
              id="oldPassword"
              name="oldPassword"
              label="Old password"
              placeholder="********"
              error={errors.oldPassword}
              value={values.oldPassword}
              onChange={handleChange('oldPassword')}
            />

            <PasswordInput
              id="password"
              name="password"
              label="New password"
              placeholder="********"
              error={errors.password}
              value={values.password}
              onChange={handleChange('password')}
            />

            <PasswordInput
              placeholder="********"
              id="passwordConfirmation"
              name="passwordConfirmation"
              label="Confirm new password"
              error={errors.passwordConfirmation}
              value={values.passwordConfirmation}
              onChange={handleChange('passwordConfirmation')}
            />

            <Button
              title="Confirm"
              onPress={() => handleSubmit()}
              containerStyle={{ marginTop: 16 }}
            />
          </Form>
        )}
      </Formik>
    </Section>
  );
}
