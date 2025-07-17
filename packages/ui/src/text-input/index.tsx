import { FormInput, FormInputProps } from '../form-input';

export type TextInputProps = FormInputProps;

export function TextInput({ ...props }: TextInputProps) {
  return <FormInput {...props} />;
}
