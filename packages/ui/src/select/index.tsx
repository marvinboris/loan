import { useConfig } from '@creditwave/hooks';
import React from 'react';
import {
  Pressable,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  TouchableWithoutFeedback,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import { useInputStyles } from '../use-input-styles';
import { Typography } from '../typography';
import { SearchBar } from '../search-bar';

export type SelectProps = {
  id: string;
  name: string;
  normal?: boolean;
  bordered?: boolean;
  borderless?: boolean;
  error?: string;
  dropdown?: boolean;
  placeholder: string;
  value: string | undefined;
  onChange: (value: string) => void;
  label?: string;
  type?: 'clear';
  prepend?: React.ReactElement;
  append?: React.ReactElement;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  options: Record<string, string>;
  required?: boolean;
};

export function Select({
  onChange,
  append,
  bordered,
  borderless,
  error,
  label,
  normal = true,
  dropdown,
  placeholder,
  value,
  style,
  options,
  prepend,
  type,
  inputStyle,
  inputContainerStyle,
  required,
  ...props
}: SelectProps) {
  const { getColor } = useConfig();
  const styles = useInputStyles({ normal: normal || dropdown, bordered });

  const triggerRef = React.useRef<View>(null);

  const [isOpen, setIsOpen] = React.useState(false);
  const [hasFocus, setHasFocus] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0, width: 0 });
  const [search, setSearch] = React.useState<string>();

  const data = React.useMemo(
    () =>
      Object.entries(options)
        .filter(([v]) => v)
        .filter((e) =>
          search
            ? e.join('|').toLowerCase().includes(search.toLowerCase())
            : true
        )
        .sort((a, b) => a[1].localeCompare(b[1])),
    [options, search]
  );

  const name = value ? options[value] : undefined;

  const handleSelect = React.useCallback(
    (selectedValue: string) => {
      onChange(selectedValue);
      setIsOpen(false);
    },
    [onChange]
  );

  const renderItem: ListRenderItem<[string, string]> = React.useCallback(
    ({ item: [v, optionLabel] }) => (
      <Pressable
        key={v}
        style={[
          styles.option,
          v === value && { backgroundColor: getColor('secondary') + '20' },
        ]}
        onPress={() => handleSelect(v)}
      >
        <Typography>{optionLabel}</Typography>
      </Pressable>
    ),
    [getColor, handleSelect, styles.option, value]
  );

  React.useEffect(() => {
    if (triggerRef.current && isOpen) {
      triggerRef.current.measure((fx, fy, width, height, px, py) => {
        setPosition({
          x: px,
          y: py + height,
          width: width,
        });
      });
    }
  }, [isOpen]);

  return (
    <>
      <View
        {...props}
        ref={triggerRef}
        collapsable={false}
        style={
          type === 'clear'
            ? {}
            : [
                styles.container,
                borderless && {
                  paddingHorizontal: 0,
                  paddingVertical: 0,
                  borderWidth: 0,
                  backgroundColor: 'transparent',
                },
                style,
              ]
        }
        testID="Select"
      >
        {type === 'clear' ? (
          <Pressable
            onPress={() => setIsOpen(true)}
            style={({ pressed }) => [
              styles.input,
              { flexGrow: 0 },
              pressed && styles.inputFocused,
              inputStyle,
            ]}
          >
            <View
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
            >
              {name ? (
                <Typography
                  numberOfLines={1}
                  style={[styles.input, { height: 'auto' }, inputStyle]}
                >
                  {name}
                </Typography>
              ) : (
                <Typography
                  numberOfLines={1}
                  style={[
                    styles.input,
                    { height: 'auto', color: getColor('disabled') },
                    inputStyle,
                  ]}
                >
                  {placeholder}
                </Typography>
              )}
            </View>
          </Pressable>
        ) : (
          <>
            {label ? (
              <Typography numberOfLines={1} style={styles.label}>
                {label}
                {required ? (
                  <Typography style={styles.labelRequire}>*</Typography>
                ) : null}
              </Typography>
            ) : null}

            <View
              style={[
                styles.inputContainer,
                (isOpen || hasFocus) && styles.inputFocused,
                inputContainerStyle,
              ]}
            >
              {prepend ? <View>{prepend}</View> : null}

              <Pressable
                onFocus={() => setHasFocus(true)}
                onBlur={() => setHasFocus(false)}
                onPress={() => setIsOpen(true)}
                style={styles.input}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  {name ? (
                    <Typography
                      numberOfLines={1}
                      style={[styles.input, { height: 'auto' }]}
                    >
                      {name}
                    </Typography>
                  ) : (
                    <Typography
                      numberOfLines={1}
                      style={[
                        styles.input,
                        { height: 'auto', color: getColor('disabled') },
                      ]}
                    >
                      {placeholder}
                    </Typography>
                  )}
                </View>
              </Pressable>

              {append ? <View>{append}</View> : null}
            </View>

            {error ? (
              <Typography style={styles.error}>{error}</Typography>
            ) : null}
          </>
        )}
      </View>

      {dropdown ? (
        <Modal
          visible={isOpen}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsOpen(false)}
        >
          <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                backgroundColor: 'transparent',
              }}
            >
              <Pressable
                style={[
                  {
                    backgroundColor: getColor('background'),
                    gap: 10,
                    padding: 4,
                    position: 'absolute',
                    zIndex: 10,
                    borderWidth: 0.5,
                    borderColor: getColor('divider'),
                    borderRadius: 4,
                    minWidth: 150,
                    maxHeight: 400,
                  },
                  { top: position.y + 4 },
                  {
                    width: position.width,
                    left: position.x,
                  },
                ]}
              >
                <View>
                  <SearchBar
                    value={search}
                    onChange={setSearch}
                    id="ui-selectwrapper-search"
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <FlatList
                    data={data}
                    scrollEnabled
                    initialNumToRender={7}
                    renderItem={renderItem}
                    contentContainerStyle={{ gap: 4 }}
                  />
                </View>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      ) : (
        <Modal
          transparent
          visible={isOpen}
          animationType="fade"
          onRequestClose={() => setIsOpen(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={() => setIsOpen(false)}
          >
            <Pressable style={[styles.modalContainer, { gap: 10 }]}>
              <View>
                <Typography style={[styles.modalTitle]}>
                  {placeholder}
                </Typography>
              </View>

              <SearchBar
                value={search}
                onChange={setSearch}
                id="ui-select-search"
              />

              <FlatList
                scrollEnabled
                data={data}
                initialNumToRender={7}
                renderItem={renderItem}
              />
            </Pressable>
          </TouchableOpacity>
        </Modal>
      )}
    </>
  );
}
