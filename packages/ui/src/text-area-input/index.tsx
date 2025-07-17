import { FormInput, FormInputProps } from '../form-input';

export type TextAreaInputProps = FormInputProps;

export function TextAreaInput({ ...props }: TextAreaInputProps) {
  return (
    <FormInput
      {...props}
      inputProps={{
        multiline: true,
        numberOfLines: 5,
        ...props.inputProps,
      }}
      inputStyle={[
        {
          minHeight: (props.inputProps?.numberOfLines ?? 5) * 26,
        },
        props.inputStyle,
      ]}
    />
  );
}
