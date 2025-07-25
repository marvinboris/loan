import { View } from 'react-native';
import { Typography } from '../typography';

export type InfoProps = {
  title: string;
  description: string;
  flat?: boolean;
};

export function Info({ title, description, flat }: InfoProps) {
  return (
    <View style={[!flat && { paddingHorizontal: 16 }, { paddingVertical: 12 }]}>
      <Typography>{title}</Typography>

      <Typography size="sm" color="grey0">
        {description}
      </Typography>
    </View>
  );
}
