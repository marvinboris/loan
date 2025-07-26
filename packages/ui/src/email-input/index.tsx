import { useConfig } from '@creditwave/hooks';
import { z } from 'zod';
import { FormInput, FormInputProps } from '../form-input';
import { EnvelopeIcon } from 'react-native-heroicons/outline';

export type EmailInputProps = FormInputProps & {
  icon?: boolean;
};

export const emailInputSchema = () => z.string().email();

export function EmailInput({ icon, ...props }: EmailInputProps) {
  const { theme } = useConfig();

  return (
    <FormInput
      inputProps={{
        inputMode: 'email',
      }}
      prepend={icon ? <EnvelopeIcon color={theme?.black} /> : undefined}
      {...props}
    />
  );
}
