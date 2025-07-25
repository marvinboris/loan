import { useConfig } from '@creditwave/hooks';
import React from 'react';
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';
import {
  CodeField,
  CodeFieldProps,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Typography } from '../typography';

export type PinCodeInputProps = Omit<
  CodeFieldProps,
  'onChange' | 'renderCell'
> & {
  id: string;
  name: string;
  cellCount?: number;
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  description?: string;
};

// Le composant fonctionnel
export function PinCodeInput({
  id,
  cellCount = 6,
  value,
  onChange: setValue,
  editable = true,
  ...props
}: PinCodeInputProps) {
  const { theme } = useConfig();

  const styles = StyleSheet.create({
    codeFieldRoot: {
      marginTop: 0,
      display: 'flex',
      justifyContent: 'center',
    },
    cell: {
      width: 40,
      height: 45,
      marginLeft: 3,
      marginRight: 3,
      borderRadius: 8,
      lineHeight: 45,
      fontSize: 24,
      borderWidth: 0.5,
      borderColor: theme?.divider,
      textAlign: 'center',
      fontFamily: 'MEDIUM',
    },
    focusCell: editable
      ? {
          borderWidth: 2,
          borderColor: theme?.warning,
        }
      : {},
  });

  const ref = useBlurOnFulfill({ value, cellCount });
  const [, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleTextChange = (val: string) => {
    if ((val.length && val.trim() === '') || isNaN(Number(val)) || !editable)
      return;

    setValue(val);
  };

  return (
    <SafeAreaView id={id}>
      {props.label ? (
        <Typography style={{ marginBottom: 8 }}>{props.label}</Typography>
      ) : null}

      {props.description ? (
        <Typography color="grey0" style={{ marginBottom: 8 }}>
          {props.description}
        </Typography>
      ) : null}

      <CodeField
        ref={ref as React.RefObject<TextInput>}
        {...props}
        value={value}
        autoComplete="off"
        caretHidden={false}
        cellCount={cellCount}
        testID="pin-code-input"
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        onChangeText={handleTextChange}
        rootStyle={styles.codeFieldRoot}
        renderCell={({ index, symbol, isFocused }) => (
          <Typography
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol}
          </Typography>
        )}
      />
    </SafeAreaView>
  );
}
