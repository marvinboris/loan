import { useConfig } from '@creditwave/hooks';
import React from 'react';
import { Pressable, ViewStyle } from 'react-native';
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from 'react-native-heroicons/outline';
import { z } from 'zod';
import { FormInput } from '../form-input';

export type PasswordInputProps = {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
  style?: ViewStyle;
  icon?: boolean;
  validable?: boolean;
  bordered?: boolean;
  borderless?: boolean;
};

export const passwordInputSchema = () =>
  z
    .string()
    .regex(/(?=.*[0-9])/, 'ui.password_input.at_least_one_number')
    .regex(/(?=.*[a-z])/, 'ui.password_input.at_least_one_lower_letter')
    .regex(/(?=.*[A-Z])/, 'ui.password_input.at_least_one_upper_letter')
    .regex(/(?=.*[@#$%^&+=])/, 'ui.password_input.at_least_one_special_char')
    .regex(/(?=\S+$)/, 'ui.password_input.no_space')
    .min(8, 'ui.password_input.at_least_8_chars')
    .max(50, 'ui.password_input.at_most_50_chars');

export function PasswordInput({ icon, ...props }: PasswordInputProps) {
  const { theme } = useConfig();

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const Icon = secureTextEntry ? EyeIcon : EyeSlashIcon;

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <FormInput
      prepend={
        icon ? <LockClosedIcon color={theme?.black} size={24} /> : undefined
      }
      inputProps={{
        secureTextEntry,
      }}
      append={
        <Pressable testID="toggle-button" onPress={toggleSecureEntry}>
          <Icon size={24} />
        </Pressable>
      }
      {...props}
    />
  );
}
