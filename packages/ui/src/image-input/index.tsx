import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Image, View } from 'react-native';
import { Button } from '../button';
import { Card } from '../card';
import { toastShow } from '../toast';
import { Typography } from '../typography';
import { useInputStyles } from '../use-input-styles';

export type ImageInputProps = {
  accept?: string;
  aspect?: ImagePicker.ImagePickerOptions['aspect'];
  value: string;
  onChange(value: string): void;
  onChange(value: string[]): void;
  multiple?: boolean;
  placeholder?: string;
};

export function ImageInput({
  aspect,
  multiple,
  onChange,
  placeholder,
  value,
}: ImageInputProps) {
  const styles = useInputStyles({ normal: true });

  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  // Demander les permissions
  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      toastShow({
        type: 'error',
        text: [
          'Permission denied',
          'We need your permission to access your photos',
        ].join('.\n'),
      });
      return false;
    }
    return true;
  };

  // Sélectionner une image depuis la galerie
  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'livePhotos'],
      allowsEditing: true,
      aspect,
      quality: 0.8,
      allowsMultipleSelection: multiple,
    });

    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };

  // Prendre une photo avec la caméra
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      toastShow({
        type: 'error',
        text: [
          'Permission refusée',
          'Nous avons besoin de la permission pour utiliser la caméra',
        ].join('.\n'),
      });
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };

  const execute = React.useCallback(async () => {
    const size = await Image.getSize(value);
    return setHeight((size.height * width) / size.width);
  }, [value, width]);

  React.useEffect(() => {
    execute();
  }, [execute]);

  return (
    <View>
      <Typography style={styles.label}>
        {placeholder || 'Upload an image'}
      </Typography>

      <Card bodyStyle={{ gap: 8 }}>
        {value ? (
          <Image
            source={{ uri: value, height }}
            onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
          />
        ) : null}

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button
            type="outline"
            onPress={pickImage}
            title="Pick image"
            containerStyle={{ flex: 1 }}
          />

          <Button
            type="outline"
            onPress={takePhoto}
            title="Take photo"
            containerStyle={{ flex: 1 }}
          />
        </View>
      </Card>
    </View>
  );
}
