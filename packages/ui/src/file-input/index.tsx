import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Image, Platform, Pressable } from 'react-native';
import { Card } from '../card';
import { Typography } from '../typography';

export type FileInputProps = {
  accept: string;
  value: string;
  onChange(value: string): void;
  onChange(value: string[]): void;
  multiple?: boolean;
  placeholder?: string;
};

export function FileInput({
  accept,
  multiple,
  onChange,
  placeholder,
  value,
}: FileInputProps) {
  // Function to handle picking any document
  const pickDocument = async (
    callback: (files: string[]) => void,
    multiple?: boolean
  ) => {
    if (Platform.OS === 'web') {
      // Web: Utilisation d'un input HTML
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = accept; // Spécifie les types de fichiers acceptés
      input.multiple = multiple || false;

      input.onchange = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (!target.files) return;

        const files = Array.from(target.files);
        const result = await Promise.all(
          files.map(convertFileToBase64).filter(Boolean)
        );

        callback(result as unknown as string[]);
      };

      input.click();
    } else {
      const result = await DocumentPicker.getDocumentAsync({
        type: accept, // Allows all file types
        copyToCacheDirectory: true,
        multiple,
      });

      if (!result.canceled) {
        
        const files = await Promise.all(
          result.assets
          .map((asset) => convertFileToBase64(asset.uri))
          .filter(Boolean)
        );
        callback(files as unknown as string[]);
      }
    }
  };

  // Utility function to convert file URI to base64 using expo-file-system
  const convertFileToBase64 = async (
    file: string | File
  ): Promise<string | null> => {
    try {
      if (Platform.OS === 'web') {
        if (file instanceof File) {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              const result = reader.result as string;
              resolve(result.split(',')[1]); // On enlève "data:<mime-type>;base64,"
            };
            reader.onerror = (error) => reject(error);
          });
        } else {
          console.error('On Web, file should be a File object.');
          return null;
        }
      } else {
        // Expo FileSystem (Android/iOS)
        const base64 = await FileSystem.readAsStringAsync(file as string, {
          encoding: FileSystem.EncodingType.Base64,
        });
        return base64;
      }
    } catch (error) {
      console.error('Error converting file to base64:', error);
      return null;
    }
  };

  if (value) console.log(value);

  return (
    <Card>
      <Pressable
        onPress={() => pickDocument((files) => onChange(files), multiple)}
      >
        {value ? (
          <Image source={{ uri: value }} height={60} />
        ) : (
          <Typography style={{ lineHeight: 60 }} align="center">
            {placeholder || 'Upload a file'}
          </Typography>
        )}
      </Pressable>
    </Card>
  );
}
