import { useConfig } from '@creditwave/hooks';
import React, { PropsWithChildren } from 'react';
import {
  View,
  ScrollView,
  Platform,
  ViewStyle,
  StyleSheet,
  Pressable,
  TextStyle,
  StyleProp,
  ActivityIndicator,
} from 'react-native';
import { ArrowRightIcon, TvIcon } from 'react-native-heroicons/outline';
import { Transition } from '../transition';
import { Typography } from '../typography';

export type SectionProps = PropsWithChildren & {
  id?: string;
  borderless?: boolean;
  direction?: 'left' | 'center';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: typeof TvIcon;
  collapsable?: boolean;
  collapsed?: boolean;
  onCollapseToggle?: (collapsed?: boolean) => void;
  fullHeight?: boolean;
  addon?: React.ReactNode;
  scrollEnabled?: boolean;
  titleText?: string;
  titleProps?: {
    style?: ViewStyle;
    textStyle?: TextStyle;
  };
  subtitleText?: React.ReactNode;
  subtitleProps?: {
    style?: ViewStyle;
    textStyle?: TextStyle;
  };
  style?: StyleProp<ViewStyle>;
  bodyStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export function Section({
  borderless = true,
  children,
  direction,
  size = 'xs',
  loading,
  collapsable,
  collapsed: currentCollapsed,
  onCollapseToggle,
  icon: Icon,
  style,
  fullHeight,
  scrollEnabled,
  bodyStyle,
  contentContainerStyle,
  addon,
  ...props
}: SectionProps) {
  const { theme } = useConfig();

  const [collapsed, setCollapsed] = React.useState(currentCollapsed);

  const forWeb =
    Platform.OS === 'web' && ({ minHeight: 'auto' } satisfies ViewStyle);

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          position: 'static',
          minHeight: 'auto',
          borderWidth: borderless ? undefined : 0.5,
          borderStyle: borderless ? undefined : 'solid',
          borderRadius: borderless
            ? undefined
            : { xs: 8, sm: 8, md: 12, lg: 20 }[size],
          paddingVertical: borderless
            ? undefined
            : { xs: 6, sm: 4, md: 8, lg: 12 }[size],
          borderColor: borderless ? undefined : theme?.divider,
          backgroundColor: borderless ? undefined : theme?.grey5,
        },
      }),
    [theme, size, borderless]
  );
  const content = (
    <>
      {props.titleText || props.subtitleText || Icon || addon ? (
        <View
          style={[
            {
              gap: 5,
              marginTop: { xs: 8, sm: 8, md: 8, lg: 12 }[size],
              paddingHorizontal: borderless
                ? undefined
                : { xs: 8, sm: 10, md: 24, lg: 24 }[size],
            },
            Boolean(Icon || addon || collapsable) && {
              flexDirection: 'row',
              alignItems: 'center',
            },
            props.titleProps?.style,
          ]}
        >
          {Icon && (
            <Icon
              color={theme.secondary}
              size={{ xs: 18, sm: 20, md: 24, lg: 30 }[size]}
            />
          )}

          <View style={Boolean(Icon || addon || collapsable) && { flex: 1 }}>
            {props.titleText && (
              <Typography
                align={direction}
                family={size === 'xs' ? 'SEMIBOLD' : 'BOLD'}
                color={size === 'xs' ? 'grey0' : 'secondary'}
                style={[
                  {
                    fontSize: { xs: 18, sm: 20, md: 24, lg: 30 }[size],
                    lineHeight: { xs: 20, sm: 24, md: 24, lg: 30 }[size],
                  },
                  props.titleProps?.textStyle,
                ]}
              >
                {props.titleText}
              </Typography>
            )}

            {props.subtitleText ? (
              <View style={[props.subtitleProps?.style]}>
                <Typography
                  align={direction}
                  style={[
                    {
                      fontSize: { xs: 14, sm: 16, md: 16, lg: 16 }[size],
                      marginTop: { xs: 2, sm: 4, md: 8, lg: 12 }[size],
                    },
                    props.subtitleProps?.textStyle,
                  ]}
                >
                  {props.subtitleText}
                </Typography>
              </View>
            ) : null}
          </View>

          {addon}

          {collapsable && (
            <Pressable
              onPress={() => {
                setCollapsed((c) => !c);
                onCollapseToggle?.();
              }}
            >
              <ArrowRightIcon
                size={{ xs: 18, sm: 20, md: 24, lg: 30 }[size]}
                style={{
                  transform: [{ rotate: collapsed ? '90deg' : '270deg' }],
                }}
              />
            </Pressable>
          )}
        </View>
      ) : null}

      <Transition show={!collapsed} style={fullHeight && { flexGrow: 1 }}>
        <View
          style={[
            fullHeight && { flexGrow: 1 },
            {
              marginVertical: { xs: 5, sm: 10, md: 16, lg: 24 }[size],
              paddingHorizontal: borderless
                ? undefined
                : { xs: 8, sm: 10, md: 24, lg: 24 }[size],
            },
            bodyStyle,
          ]}
        >
          {children}
        </View>
      </Transition>
    </>
  );

  if (scrollEnabled)
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        {...props}
        style={[styles.container, forWeb, style]}
        contentContainerStyle={[
          fullHeight && { flexGrow: 1 },
          forWeb,
          contentContainerStyle,
        ]}
      >
        {content}
      </ScrollView>
    );

  return (
    <View
      {...props}
      style={[styles.container, fullHeight && { flexGrow: 1 }, forWeb, style]}
    >
      {loading ? <ActivityIndicator /> : content}
    </View>
  );
}
