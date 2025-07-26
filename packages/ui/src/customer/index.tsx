import React from 'react';
import { Pressable, View } from 'react-native';
import { Typography } from '../typography';
import { CustomerForm, CustomerProps } from './form';
import { Modal } from '../modal';

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

  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Modal title={mobile} show={visible} setShow={setVisible}>
        <CustomerForm {...props} mobile={mobile} />
      </Modal>

      <Pressable
        onPress={() => setVisible(true)}
        style={{ gap: 4, paddingVertical: 12, paddingHorizontal: 16 }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Typography family="BOLD">{mobile}</Typography>

          <Pressable>
            <Typography>Dial</Typography>
          </Pressable>
        </View>

        <View
          style={{
            gap: 10,
            flexDirection: 'row',
          }}
        >
          <Pressable style={{ flex: 1 }}>
            <Typography size="sm">Record</Typography>
          </Pressable>

          <Pressable style={{ flex: 1 }}>
            <Typography size="sm" align="center">
              Send SMS
            </Typography>
          </Pressable>

          <Pressable style={{ flex: 1 }}>
            <Typography size="sm" align="right">
              WhatsApp
            </Typography>
          </Pressable>
        </View>
      </Pressable>
    </>
  );
}
