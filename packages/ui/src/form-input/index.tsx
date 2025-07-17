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
  placeholder: string;
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
  transcript?: boolean;
  cancelSave?: boolean;
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
  cancelSave,
  error,
  id,
  inputProps,
  inputStyle,
  label,
  name,
  normal,
  onChange,
  placeholder,
  prepend,
  style,
  transcript,
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

  const [value, setValue] = React.useState(initialValue);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const onChangeText = (value: string) => {
    setIsTouched(true);
    if (cancelSave) setValue(value);
    else onChange(value);
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
        </Typography>
      ) : null}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          props.inputContainerStyle,
        ]}
      >
        {prepend ? <View>{prepend}</View> : null}

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
          value={cancelSave ? value : initialValue}
        />

        {append}
      </View>

      {error && isTouched ? (
        <Typography style={styles.error}>{error}</Typography>
      ) : null}
    </View>
  );
}
