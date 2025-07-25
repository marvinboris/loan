import { useConfig } from '@creditwave/hooks';
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import moment from 'moment';
import React from 'react';
import { View, Pressable, Platform } from 'react-native';
import { z } from 'zod';
import { FormInput, FormInputProps } from '../form-input';
import { Typography } from '../typography';
import { useInputStyles } from '../use-input-styles';

export type DateInputProps = FormInputProps;

const onWeb = Platform.OS === 'web';

export const dateInputSchema = () =>
  z.string().refine((val) => val && moment.isMoment(moment(val)), {
    message: 'ui.date_input.error',
  });

export function DateInput({
  onChange,
  placeholder,
  value,
  ...props
}: DateInputProps) {
  const { theme } = useConfig();
  const styles = useInputStyles();
  const [show, setShow] = React.useState(false);
  const [hasFocus, setHasFocus] = React.useState(false);

  const date = React.useMemo(
    () => (value ? new Date(value) : new Date()),
    [value]
  );

  const handleChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios'); // Hide on Android after selection
    onChange(moment(currentDate).format('YYYY-MM-DD'));
  };

  return (
    <>
      <FormInput {...props} value={value} onChange={onChange}>
        {onWeb ? (
          <input
            type="date"
            id={props.id}
            value={value}
            name={props.name}
            onBlur={() => setHasFocus(false)}
            onFocus={() => setHasFocus(true)}
            style={{
              ...(styles.input as StyleSheet),
              ...(hasFocus && styles.inputFocused),
              backgroundColor: 'transparent',
              outline: 'none',
              borderWidth: 0,
            }}
            onChange={(e) => {
              onChange(e.currentTarget.value);
            }}
          />
        ) : (
          <Pressable style={[styles.input]} onPress={() => setShow((s) => !s)}>
            <View
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
            >
              <Typography
                style={[
                  styles.input,
                  { height: 'auto' },
                  !value && { color: theme?.disabled },
                ]}
              >
                {value ? moment(value).format('DD/MM/YYYY') : 'DD/MM/YYYY'}
              </Typography>
            </View>
          </Pressable>
        )}
      </FormInput>

      {show && (
        <RNDateTimePicker
          is24Hour
          mode="date"
          value={date}
          onChange={handleChange}
        />
      )}
    </>
  );
}
