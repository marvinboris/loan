import * as DocumentPicker from 'expo-document-picker';
import React from 'react';
import { Image } from 'react-native';
import { Card } from '../card';
import { Typography } from '../typography';

export type DocumentInputProps = {
  accept?: string;
  value: string;
  onChange(value: string): void;
  onChange(value: string[]): void;
  multiple?: boolean;
  placeholder?: string;
};

export function DocumentInput({
  accept = '*',
  multiple,
  onChange,
  placeholder,
  value,
}: DocumentInputProps) {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  // Function to handle picking any document
  const pickFile = React.useCallback(
    async (callback: DocumentInputProps['onChange'], multiple?: boolean) => {
      const result = await DocumentPicker.getDocumentAsync({
        type: accept, // Allows all file types
        copyToCacheDirectory: true,
        multiple,
      });

      if (!result.canceled) {
        const files = await Promise.all(
          result.assets.map((asset) => asset.uri).filter(Boolean)
        );
        if (multiple) callback(files);
        else callback(files[0]);
      }
    },
    [accept]
  );

  const execute = React.useCallback(async () => {
    const size = await Image.getSize(value);
    return setHeight((size.height * width) / size.width);
  }, [value, width]);

  React.useEffect(() => {
    execute();
  }, [execute]);

  return (
    <Card onPress={() => pickFile(onChange, multiple)}>
      {value ? (
        <Image
          source={{ uri: value, height }}
          onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        />
      ) : (
        <Typography style={{ lineHeight: 60 }} align="center">
          {placeholder || 'Upload a file'}
        </Typography>
      )}
    </Card>
  );
}
