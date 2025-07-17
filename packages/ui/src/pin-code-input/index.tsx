import { useConfig } from '@creditwave/hooks';
import React from 'react';
import { SafeAreaView, StyleSheet, ViewStyle, TextStyle } from 'react-native';
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
};

// Le composant fonctionnel
export const PinCodeInput: React.FC<PinCodeInputProps> = ({
  id,
  cellCount = 6,
  value,
  onChange: setValue,
  ...props
}) => {
  const { theme } = useConfig();

  const styles = StyleSheet.create({
    codeFieldRoot: {
      marginTop: 0,
      display: 'flex',
      justifyContent: 'center',
    } as ViewStyle,
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
    } as TextStyle,
    focusCell: props.editable
      ? ({
          borderWidth: 2,
          borderColor: theme?.warning,
        } as TextStyle)
      : {},
  });

  const ref = useBlurOnFulfill({ value, cellCount });
  const [, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleTextChange = (val: string) => {
    if (
      (val.length && val.trim() === '') ||
      isNaN(Number(val)) ||
      !props.editable
    )
      return;

    setValue(val);
  };

  return (
    <SafeAreaView id={id}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        autoComplete="off"
        caretHidden={false}
        cellCount={cellCount}
        testID="my-code-input"
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
};
