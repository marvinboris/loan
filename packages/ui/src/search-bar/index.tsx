import { StyleProp, ViewStyle } from 'react-native';
import { FormInput } from '../form-input';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';

export type SearchBarProps = {
  id: string;
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  append?: React.ReactElement;
  style?: StyleProp<ViewStyle>;
  autoFocus?: boolean;
};

export function SearchBar(props: SearchBarProps) {
  return (
    <FormInput
      {...props}
      normal
      name="search"
      placeholder="Search..."
      inputProps={{ autoFocus: props.autoFocus }}
      append={props.append || <MagnifyingGlassIcon />}
    />
  );
}
