import { useConfig } from '@creditwave/hooks';
import { observable } from '@legendapp/state';
import { observer, use$ } from '@legendapp/state/react';
import React from 'react';
import { View } from 'react-native';
import { Typography } from '../typography';

export type ToastType = 'info' | 'success' | 'error' | 'warning';

const state$ = observable({
  visible: false,
  text: '',
  type: 'info' as ToastType,
});

let hideTimeout: NodeJS.Timeout | null = null;

export const Toast = observer(function () {
  const state = use$(state$);
  const [width, setWidth] = React.useState(0);

  const { getColor } = useConfig();
  const color = state.type === 'info' ? 'black' : state.type;

  const borderColor = getColor(color);
  const backgroundColor = getColor(color) + '22';

  React.useEffect(() => {
    return () => {
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <View
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      style={{
        position: 'absolute',
        zIndex: 50,
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 20,
        paddingVertical: 10,
        left: '50%',
        backgroundColor,
        borderColor,
        bottom: state.visible ? 20 : -320,
        transform: [{ translateX: width * -0.5 }],
      }}
    >
      <Typography color={color}>{state.text}</Typography>
    </View>
  );
});

export const toastShow = ({
  type,
  text,
  duration = 5000,
}: {
  type?: ToastType;
  text: string;
  duration?: number;
}) => {
  // Clear any pending hide operation
  if (hideTimeout) clearTimeout(hideTimeout);

  // Immediately show the new toast
  state$.assign({
    visible: true,
    text,
    type: type || 'error', // Default to error for your use case
  });

  // Set timeout to hide toast after duration
  hideTimeout = setTimeout(() => {
    state$.visible.set(false);
  }, duration);
};
