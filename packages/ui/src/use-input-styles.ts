import { useConfig } from '@creditwave/hooks';
import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';

export function useInputStyles({
  bordered = false,
  multiline = false,
  normal = false,
} = {}) {
  const { getColor } = useConfig();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container:
          normal || bordered
            ? {}
            : {
                borderStyle: 'solid',
                borderWidth: 0.5,
                borderColor: getColor('divider'),
                paddingHorizontal: 6,
                paddingVertical: 4,
                borderRadius: normal ? 6 : 8,
                backgroundColor: getColor('white'),
              },
        label: {
          marginBottom: 8,
          fontSize: normal ? 16 : 18,
          fontFamily: normal ? 'REGULAR' : 'MEDIUM',
          color: normal ? undefined : getColor('primary'),
        },
        labelRequire: {
          color: getColor('warning'),
          fontFamily: 'BOLD',
        },
        error: {
          color: getColor('error'),
          fontSize: 16,
          fontFamily: 'ITALIC',
        },
        inputFocused: {
          borderWidth: 2,
          borderColor: getColor('warning'),
          marginVertical: normal || bordered ? -1.5 : 0,
        },
        inputContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: normal || bordered ? 0.5 : 2,
          borderColor: normal || bordered ? getColor('divider') : 'transparent',
          borderRadius: normal || bordered ? 6 : 8,
          paddingHorizontal: 8,
          backgroundColor:
            normal || bordered ? getColor('background') : undefined,
          maxWidth: '100%',
          gap: 8,
        },
        input: {
          flex: 1,
          textAlignVertical: multiline ? 'top' : undefined,
          height: normal || bordered ? 40 : multiline ? 64 : 40,
          fontSize: 16,
          color: getColor('black'),
          fontFamily: 'REGULAR',
          paddingVertical: multiline ? 5 : 0,
          outlineStyle: 'none',
        } as ViewStyle,
        toggleButton: {
          padding: 8,
        },
        modalOverlay: {
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        modalContainer: {
          padding: 20,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          height: '50%',
          minHeight: 300,
          backgroundColor: getColor('white'),
          gap: 10,
        },
        modalTitle: {
          fontFamily: 'SEMIBOLD',
          fontSize: 20,
          color: getColor('primary'),
        },
        option: {
          gap: 10,
          paddingVertical: 12,
          paddingHorizontal: 16,
          flexDirection: 'row',
        },
      }),
    [bordered, getColor, multiline, normal]
  );

  return styles;
}
