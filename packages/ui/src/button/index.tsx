import { useConfig } from '@creditwave/hooks';
import {
  Button as RNEButton,
  ButtonProps as RNEButtonProps,
} from '@rneui/themed';
import { Text, View } from 'react-native';
import { TvIcon } from 'react-native-heroicons/outline';

export type ButtonProps = Omit<RNEButtonProps, 'color' | 'icon'> & {
  icon?: typeof TvIcon;
  color?:
    | 'secondary'
    | 'primary'
    | 'success'
    | 'error'
    | 'warning'
    | 'white'
    | 'disabled'
    | 'background';
};

export function Button({
  color = 'primary',
  role = 'button',
  buttonStyle,
  loadingProps,
  titleStyle,
  icon: Icon,
  iconRight,
  size = 'md',
  title,
  type = 'solid',
  ...props
}: ButtonProps) {
  if (props.disabled) {
    color = 'disabled';
    type = 'outline';
    props.onPress = undefined;
  }

  const { theme } = useConfig();

  const white = theme?.white;
  const black = theme?.black;

  const colorValue =
    (color &&
      theme &&
      (color as string) in theme &&
      (theme[color as unknown as keyof NonNullable<typeof theme>] as string)) ||
    undefined;

  const titleColor =
    type === 'solid' ? (color === 'white' ? black : white) : colorValue;

  return (
    <RNEButton
      color={color}
      role={role}
      type={type}
      size={size}
      loadingProps={{ color: titleColor, ...loadingProps }}
      buttonStyle={[
        { borderRadius: 8 },
        type === 'outline' && { borderColor: colorValue },
        type === 'solid' && { backgroundColor: colorValue },
        buttonStyle,
      ]}
      titleStyle={[
        {
          fontSize: size === 'sm' ? 14 : 18,
          fontFamily: 'REGULAR',
        },
        type !== 'solid' && { color: colorValue },
        color === 'white' && type === 'solid' && { color: black },
        titleStyle,
      ]}
      {...props}
    >
      {props.children || (
        <View
          style={{
            flexDirection: iconRight ? 'row-reverse' : 'row',
            gap: size === 'sm' ? 4 : 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {Icon ? (
            <Icon
              color={titleColor}
              size={{ sm: 12, md: 18, lg: 24 }[size]}
              style={props.iconContainerStyle}
            />
          ) : null}

          {title ? (
            <Text
              style={[
                {
                  fontSize: size === 'sm' ? 14 : 18,
                  fontFamily: 'REGULAR',
                  textAlign: 'center',
                  color: titleColor,
                },
                titleStyle,
              ]}
              {...props.titleProps}
            >
              {title}
            </Text>
          ) : null}
        </View>
      )}
    </RNEButton>
  );
}
