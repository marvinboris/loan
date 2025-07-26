import { useConfig } from '@creditwave/hooks';
import React from 'react';
import {
  Modal as RNModal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { TvIcon, XMarkIcon } from 'react-native-heroicons/outline';
import { Typography } from '../typography';

export type ModalProps = React.PropsWithChildren & {
  show: boolean;
  setShow: (show: boolean) => void;
  cancelConfirmation?: boolean;
  fullScreen?: boolean;
  scrollEnabled?: boolean;
  title: string;
  subtitle?: string;
  direction?: 'center' | 'left' | 'right';
  size?: 'lg' | 'md' | 'sm';
  icon?: typeof TvIcon;
  style?: StyleProp<ViewStyle>;
  bodyStyle?: StyleProp<ViewStyle>;
};

export function Modal({
  show,
  setShow,
  bodyStyle,
  fullScreen,
  scrollEnabled = true,
  title,
  subtitle,
  direction = 'left',
  size = 'md',
  children,
  icon: Icon,
  style,
}: ModalProps) {
  const { theme } = useConfig();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      padding: 20,
    },
    modalView: {
      backgroundColor: theme.background,
      borderRadius: 8,
      padding: 16,
      shadowColor: theme.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    header: {
      marginBottom: 20,
      paddingBottom: 5,
      gap: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 0.5,
      borderBottomColor: theme.divider,
    },
    title: {
      fontSize: 20,
      fontFamily: 'SEMIBOLD',
      marginBottom: 8,
      color: theme?.primary,
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 8,
    },
    closeButton: {
      alignSelf: 'flex-start',
    },
    content: {
      paddingBottom: 8,
      marginTop: -16,
      paddingTop: 8,
    },
  });

  const onClose = () => setShow(false);

  return (
    <RNModal
      transparent
      visible={show}
      animationType="fade"
      onRequestClose={() => setShow(false)}
    >
      <SafeAreaView style={{ flex: 1 }} testID="modalView">
        <Pressable onPress={onClose} style={[styles.container]}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ marginVertical: 'auto' }}
          >
            <Pressable
              style={[
                styles.modalView,
                {
                  width: '100%',
                  marginHorizontal: 'auto',
                  maxWidth: {
                    sm: 400,
                    md: 800,
                    lg: undefined,
                  }[size],
                },
                style,
                fullScreen && { height: '100%' },
              ]}
            >
              <View style={styles.header}>
                <View
                  style={{
                    flex: 1,
                    alignItems: (
                      {
                        center: 'center',
                        left: 'flex-start',
                        right: 'flex-end',
                      } as const
                    )[direction],
                  }}
                >
                  <View style={{ flexDirection: 'row', gap: 4 }}>
                    {Icon && <Icon color={theme.primary} />}
                    <Typography style={styles.title}>{title}</Typography>
                  </View>

                  {subtitle && (
                    <Typography style={styles.subtitle}>{subtitle}</Typography>
                  )}
                </View>

                <Pressable
                  testID="closeButton"
                  onPress={onClose}
                  style={styles.closeButton}
                >
                  <XMarkIcon />
                </Pressable>
              </View>

              <View
                style={[styles.content, fullScreen ? { flex: 1 } : bodyStyle]}
              >
                {fullScreen && scrollEnabled ? (
                  <ScrollView
                    contentContainerStyle={bodyStyle}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                  >
                    {children}
                  </ScrollView>
                ) : (
                  children
                )}
              </View>
            </Pressable>
          </ScrollView>
        </Pressable>
      </SafeAreaView>
    </RNModal>
  );
}
