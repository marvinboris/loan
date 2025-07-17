import { useRequest } from '@creditwave/hooks';
import { Button, Form, Typography } from '@creditwave/ui';
import { Formik } from 'formik';
import { authService } from '../../services';
import { Pressable } from 'react-native';

export default function Page() {
  const { loading } = useRequest();

  const initialValues = {
    code: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (data) => {
        await authService.verify(data);
      }}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <Form>
          <Button
            color="primary"
            loading={loading}
            title="Continue"
            onPress={() => handleSubmit()}
          />

          <Pressable>
            <Typography underline align="center">
              Resend code
            </Typography>
          </Pressable>
        </Form>
      )}
    </Formik>
  );
}
