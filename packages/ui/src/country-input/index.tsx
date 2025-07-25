import { useConfig } from '@creditwave/hooks';
import {
  getCountryPhoneCodesByIso2,
  getCountryPhoneCodesByNames,
} from '@creditwave/utils';
import React from 'react';
import {
  Pressable,
  View,
  Modal,
  FlatList,
  ListRenderItem,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Flag } from '../flag';
import { SearchBar } from '../search-bar';
import { Typography } from '../typography';
import { useInputStyles } from '../use-input-styles';

export type CountryInputProps = {
  id: string;
  normal?: boolean;
  type?: 'code' | 'name';
  name: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  style?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
};

export function CountryInput({
  onChange,
  label,
  placeholder,
  value,
  style,
  normal,
  type = 'name',
  inputContainerStyle,
  ...props
}: CountryInputProps) {
  const { theme } = useConfig();
  const styles = useInputStyles({ normal });

  const triggerRef = React.useRef<View>(null);

  const [isOpen, setIsOpen] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [search, setSearch] = React.useState<string>();

  const options = React.useMemo(() => getCountryPhoneCodesByNames() || {}, []);
  const iso2 = React.useMemo(() => getCountryPhoneCodesByIso2() || {}, []);
  const data = React.useMemo(
    () =>
      Object.entries(options)
        .filter((e) =>
          search
            ? e.join('|').toLowerCase().includes(search.toLowerCase())
            : true
        )
        .sort((a, b) => a[1].localeCompare(b[1])),
    [options, search]
  );

  const name = React.useMemo(
    () => (value ? options[value] : undefined),
    [value, options]
  );

  const handleCountryInput = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const renderItem: ListRenderItem<[string, string]> = React.useCallback(
    ({ item: [v, optionLabel], index }) => (
      <Pressable
        key={v + optionLabel + index}
        style={[
          styles.option,
          v === value && { backgroundColor: theme?.secondary + '20' },
        ]}
        onPress={() => handleCountryInput(v)}
      >
        {type !== 'name' && <Flag country={iso2[v]} />}
        <Typography numberOfLines={1}>
          {optionLabel}
          {type !== 'name' && <> ({v.startsWith('+') ? v : '+' + v})</>}
        </Typography>
      </Pressable>
    ),
    []
  );

  return (
    <>
      {type === 'name' ? (
        <View
          {...props}
          ref={triggerRef}
          collapsable={false}
          testID="CountryInput"
          style={[styles.container, style]}
        >
          {label ? <Typography style={styles.label}>{label}</Typography> : null}

          <View
            style={[
              styles.inputContainer,
              isFocused && styles.inputFocused,
              inputContainerStyle,
            ]}
          >
            <Pressable
              onPress={() => setIsOpen(true)}
              style={styles.input}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <View
                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
              >
                {name ? (
                  <Typography style={[styles.input, { height: 'auto' }]}>
                    {name}
                  </Typography>
                ) : (
                  <Typography
                    style={[
                      styles.input,
                      { height: 'auto', color: theme?.disabled },
                    ]}
                  >
                    {placeholder}
                  </Typography>
                )}
              </View>
            </Pressable>
          </View>
        </View>
      ) : (
        <View ref={triggerRef} collapsable={false}>
          <Pressable
            onPress={() => setIsOpen(true)}
            style={styles.input}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Flag country={iso2[value]} />
              <Typography>
                {value.startsWith('+') ? value : '+' + value}
              </Typography>
            </View>
          </Pressable>
        </View>
      )}

      <Modal
        visible={isOpen}
        animationType="fade"
        transparent
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPressOut={() => setIsOpen(false)}
        >
          <View
            style={[
              styles.modalContainer,
              {
                backgroundColor: theme?.white,
                gap: 10,
              },
            ]}
          >
            <Typography style={styles.modalTitle}>
              Select country phone code
            </Typography>

            <SearchBar
              id="ui-countryinput-search"
              value={search}
              onChange={setSearch}
            />

            <FlatList
              scrollEnabled
              data={data}
              //initialNumToRender={7}
              renderItem={renderItem}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
