import { useConfig } from '@creditwave/hooks';
import React from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { CardProps } from '../card';
import { Picture } from '../picture';
import { Typography } from '../typography';
import { useInputStyles } from '../use-input-styles';

export type PictureInputProps = Omit<CardProps, 'size'> & {
  placeholder: string;
  size?: number;
};

export function PictureInput({ placeholder, ...props }: PictureInputProps) {
  const { theme } = useConfig();
  const styles = useInputStyles();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Pressable onPress={() => setIsOpen(true)}>
        <Picture {...props} />
      </Pressable>

      <Modal
        visible={isOpen}
        animationType="fade"
        transparent
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setIsOpen(false)}
        >
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: theme?.white, gap: 10 },
            ]}
          >
            <Text style={styles.modalTitle}>{placeholder}</Text>

            <Typography>FilePicker</Typography>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
