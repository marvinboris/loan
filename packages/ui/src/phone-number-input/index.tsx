import { getCountries } from '@creditwave/utils';
import { isValidPhoneNumber } from 'libphonenumber-js';
import React from 'react';
import { z } from 'zod';
import { FormInput, FormInputProps } from '../form-input';
import { Typography } from '../typography';

export type PhoneNumberInputProps = FormInputProps & {
  icon?: boolean;
};

export const phoneNumberInputSchema = () =>
  z
    .string()
    .refine(
      (val) => isValidPhoneNumber((val.startsWith('+') ? '' : '+') + val),
      {
        message: 'Invalid phone number',
      }
    );

export function PhoneNumberInput({
  code: withCode = true,
  onChange,
  value,
  ...props
}: PhoneNumberInputProps & {
  code?: boolean;
}) {
  const defaultCode = React.useMemo(
    () =>
      getCountries().find((c) => c.iso2.toLowerCase() === 'cm')?.phone as
        | string
        | undefined,
    []
  );

  const [initialCode, phone] = React.useMemo(
    () => (value || '').split(' '),
    [value]
  );
  const [code, setCode] = React.useState(initialCode || defaultCode || '');

  const onChangeText = (value: string | undefined) => {
    if (!value?.split('').every((l) => '0123456789'.includes(l))) return;
    onChange(code + ' ' + value);
  };

  React.useEffect(() => {
    onChangeText(phone);
  }, [code]);

  return (
    <FormInput
      inputProps={{
        inputMode: 'numeric',
      }}
      value={phone}
      onChange={(value: string) => onChangeText(value as string)}
      prepend={
        withCode ? (
          <Typography style={{ marginVertical: 'auto' }}>+{code}</Typography>
        ) : undefined
      }
      {...props}
    />
  );
}
