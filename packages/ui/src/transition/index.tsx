import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

export interface TransitionProps {
  show: boolean;
  duration?: number;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  mode?: 'scale' | 'translate' | 'fade'; // Add the mode prop
}

export function Transition({
  show: visible,
  duration = 100,
  style,
  children,
  mode = 'scale',
}: TransitionProps) {
  const animation = React.useRef(new Animated.Value(visible ? 1 : 0)).current;
  const [show, setShow] = React.useState(visible);

  React.useEffect(() => {
    if (visible) {
      setShow(true);
      Animated.timing(animation, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }).start(() => setShow(false));
    }
  }, [visible, duration, animation]);

  const transform =
    mode === 'translate'
      ? [
          {
            translateX: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [-50, 0], // Adjust translation values as needed
            }),
          },
        ]
      : mode === 'scale'
      ? [
          {
            scale: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0.9, 1],
            }),
          },
        ]
      : [];

  return (
    show && (
      <Animated.View
        style={[
          style,
          {
            opacity: animation,
            transform,
          },
        ]}
      >
        {children}
      </Animated.View>
    )
  );
}
