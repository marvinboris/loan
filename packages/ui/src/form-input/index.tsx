import { useConfig } from '@creditwave/hooks';
import React from 'react';
import {
  StyleProp,
  TextInput,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { Typography } from '../typography';
import { useInputStyles } from '../use-input-styles';

export type FormInputProps = ViewProps & {
  id: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  value: string | undefined;
  onChange:
    | ((value: string) => void)
    | React.Dispatch<React.SetStateAction<string | undefined>>;
  normal?: boolean;
  bordered?: boolean;
  borderless?: boolean;
  error?: string;
  label?: string;
  prepend?: React.ReactNode;
  append?: React.ReactNode;
  inputStyle?: StyleProp<TextStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputProps?: Omit<
    React.ComponentProps<typeof TextInput>,
    | 'value'
    | 'autoCorrect'
    | 'onBlur'
    | 'style'
    | 'autoCapitalize'
    | 'onFocus'
    | 'placeholder'
    | 'onChangeText'
  >;
};

export function FormInput({
  append,
  bordered,
  borderless,
  error,
  id,
  inputProps,
  inputStyle,
  label,
  name,
  normal = true,
  onChange,
  placeholder,
  prepend,
  required,
  style,
  value: initialValue,
  ...props
}: FormInputProps) {
  const { theme } = useConfig();
  const styles = useInputStyles({
    normal,
    multiline: inputProps?.multiline,
    bordered,
  });

  const [isFocused, setIsFocused] = React.useState(false);
  const [isTouched, setIsTouched] = React.useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const onChangeText = (value: string) => {
    setIsTouched(true);
    onChange(value);
  };

  return (
    <View
      {...props}
      style={[
        styles.container,
        borderless && {
          paddingHorizontal: 0,
          paddingVertical: 0,
          borderWidth: 0,
          backgroundColor: 'transparent',
        },
        style,
      ]}
      testID="FormInput"
    >
      {label ? (
        <Typography numberOfLines={1} style={styles.label}>
          {label}
          {required ? <Typography color="error">*</Typography> : null}
        </Typography>
      ) : null}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          props.inputContainerStyle,
        ]}
      >
        {prepend ? (
          <View
            style={{
              alignSelf: 'stretch',
              flexDirection: 'row',
            }}
          >
            {prepend}
          </View>
        ) : null}

        {props.children || (
          <TextInput
            {...inputProps}
            autoCorrect={false}
            onBlur={handleBlur}
            autoCapitalize="none"
            onFocus={handleFocus}
            placeholder={placeholder}
            cursorColor={theme?.black}
            onChangeText={onChangeText}
            testID="FormInput-TextInput"
            style={[styles.input, inputStyle]}
            placeholderTextColor={theme?.disabled}
            value={initialValue}
          />
        )}

        {append}
      </View>

      {error && isTouched ? (
        <Typography style={styles.error}>{error}</Typography>
      ) : null}
    </View>
  );
}
