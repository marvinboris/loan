import React from 'react';
import { View } from 'react-native';
import { Button } from '../button';
import { FormInput, FormInputProps } from '../form-input';

export type NumberInputProps = Omit<FormInputProps, 'value' | 'onChange'> & {
  step?: number;
  controls?: boolean;
  value: number | undefined;
  onChange(value: number): void;
  onChange(value: number | undefined): void;
};

export function NumberInput({
  value,
  onChange,
  step = 1,
  controls = true,
  ...props
}: NumberInputProps) {
  return (
    <FormInput
      {...props}
      value={value?.toString()}
      onChange={(value: string | undefined) => {
        const isRegexTrue = /^[+-]?\d*\.?\d*$/.test(value ?? '');

        if (value === '-') {
          onChange(undefined);
        } else if (isRegexTrue) {
          onChange(value !== undefined ? +value : undefined);
        }
      }}
      prepend={
        <>
          {props.prepend}

          {controls && (
            <Button
              size="sm"
              title="-"
              id={props.id + '-minus'}
              buttonStyle={{ width: 32 }}
              onPress={() => onChange(+(value || 0) - step)}
              titleStyle={{ lineHeight: 24, fontSize: 24 }}
            />
          )}
        </>
      }
      inputProps={{
        numberOfLines: 1,
        keyboardType: 'decimal-pad',
        multiline: false,
        ...props.inputProps,
      }}
      inputStyle={[{ textAlign: 'right', minWidth: 0 }, props.inputStyle]}
      append={
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}
        >
          {controls && (
            <Button
              size="sm"
              title="+"
              id={props.id + '-plus'}
              buttonStyle={{ width: 32 }}
              onPress={() => onChange(+(value || 0) + step)}
              titleStyle={{ lineHeight: 24, fontSize: 24 }}
            />
          )}
          {props.append}
        </View>
      }
    />
  );
}
