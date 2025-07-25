import React from 'react';
import { View, ViewProps } from 'react-native';

export type FormProps = ViewProps;

export function Form({ children, style, ...props }: FormProps) {
  return (
    <View
      testID="form-container"
      style={[{ gap: 8, paddingBottom: 1 }, style]}
      {...props}
    >
      {children}
    </View>
  );
}
