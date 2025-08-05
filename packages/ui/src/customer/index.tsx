import { useConfig } from '@creditwave/hooks';
import React from 'react';
import { Linking, Pressable, View } from 'react-native';
import { Modal } from '../modal';
import { Typography } from '../typography';
import { CustomerForm, CustomerProps } from './form';

export { CustomerProps };

const encodePhoneNumber = (mobile: string): string => {
  if (mobile.includes('*')) return mobile;

  return mobile
    .split('')
    .map((c, i) => (4 <= i && i <= 8 ? '*' : c))
    .join('');
};

export function Customer(props: CustomerProps) {
  const mobile = encodePhoneNumber(props.mobile);

  const { theme } = useConfig();
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Modal title={mobile} show={visible} setShow={setVisible}>
        <CustomerForm {...props} mobile={mobile} />
      </Modal>

      <Pressable
        onPress={() => setVisible(true)}
        style={({ pressed }) => [
          { gap: 4, paddingVertical: 12, paddingHorizontal: 16 },
          pressed && { backgroundColor: theme.primary + '22' },
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Typography family="BOLD">{mobile}</Typography>

          <Pressable onPress={() => Linking.openURL('tel:' + props.mobile)}>
            <Typography>Dial</Typography>
          </Pressable>
        </View>

        <View
          style={{
            gap: 10,
            flexDirection: 'row',
          }}
        >
          <View style={{ flex: 1 }}>
            <Typography size="sm">Record</Typography>
          </View>

          <Pressable
            style={{ flex: 1 }}
            onPress={() => Linking.openURL('sms:' + props.mobile)}
          >
            <Typography size="sm" align="center">
              Send SMS
            </Typography>
          </Pressable>

          <Pressable
            style={{ flex: 1 }}
            onPress={() => Linking.openURL('whatsapp:' + props.mobile)}
          >
            <Typography size="sm" align="right">
              WhatsApp
            </Typography>
          </Pressable>
        </View>
      </Pressable>
    </>
  );
}
