import { useConfig } from '@creditwave/hooks';
import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import { Transition } from '../transition';
import { Typography } from '../typography';

export type CardProps = PressableProps & {
  addon?: React.ReactNode;
  borderless?: boolean;
  addonShownWhenCollapsed?: boolean;
  header?: boolean;
  collapsable?: boolean;
  collapsed?: boolean;
  collapsedContent?: React.ReactElement;
  onCollapseToggle?: (collapsed?: boolean) => void;
  title?: string | JSX.Element;
  titleProps?: {
    style?: StyleProp<ViewStyle>;
    textStyle?: TextStyle;
  };
  subtitleText?: string;
  subtitle?: React.ReactNode;
  subtitleProps?: {
    style?: StyleProp<ViewStyle>;
    textStyle?: TextStyle;
  };
  style?: StyleProp<ViewStyle>;
  bodyStyle?: StyleProp<ViewStyle>;
  size?: 'xs' | 'sm' | 'md' | 'lg';
};

export function Card({
  addonShownWhenCollapsed = true,
  borderless,
  collapsable,
  collapsed: currentCollapsed,
  collapsedContent,
  onCollapseToggle,
  subtitle,
  ...props
}: CardProps) {
  const [collapsed, setCollapsed] = React.useState(currentCollapsed);

  const {
    addon,
    children,
    header,
    style,
    bodyStyle,
    size = 'md',
    ...rest
  } = props;

  const { getColor } = useConfig();

  const padding = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 20,
  };
  const borderRadius = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 20,
  };

  return (
    <Pressable
      {...rest}
      style={[
        !borderless && {
          borderWidth: 0.5,
          borderStyle: 'solid',
          padding: padding[size],
          borderRadius: borderRadius[size],
          backgroundColor: getColor('white'),
          borderColor: getColor('divider'),
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <View style={[{ flex: 1 }, props.titleProps?.style]}>
          {props.title &&
            (typeof props.title === 'string' ? (
              <Typography
                style={[{ fontFamily: 'MEDIUM' }, props.titleProps?.textStyle]}
              >
                {props.title}
              </Typography>
            ) : (
              props.title
            ))}
        </View>

        {!(!addonShownWhenCollapsed && collapsed) && <View>{addon}</View>}

        {collapsable && (
          <Pressable
            onPress={() => {
              setCollapsed((c) => !c);
              onCollapseToggle?.();
            }}
          >
            <ArrowRightIcon
              color={getColor('black')}
              size={{ xs: 16, sm: 18, md: 20, lg: 24 }[size]}
              style={{
                transform: [{ rotate: collapsed ? '90deg' : '270deg' }],
              }}
            />
          </Pressable>
        )}
      </View>

      {props.subtitleText && (
        <View style={props.subtitleProps?.style}>
          <Typography style={props.subtitleProps?.textStyle}>
            {props.subtitleText}
          </Typography>
        </View>
      )}

      {subtitle}

      {collapsed && collapsedContent}

      <Transition show={!collapsed} style={bodyStyle}>
        {children as React.ReactNode}
      </Transition>
    </Pressable>
  );
}
