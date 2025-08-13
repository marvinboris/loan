import { useConfig } from '@creditwave/hooks';
import React from 'react';
import { Linking, Pressable, View } from 'react-native';
import { Modal } from '../modal';
import { Typography } from '../typography';
import { toastShow } from '../toast';
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

  const color = props.remarks ? 'white' : 'black';
  const backgroundColor =
    props.remarks === 0
      ? undefined
      : props.remarks === 1
      ? theme.primary
      : props.remarks === 2
      ? theme.warning
      : theme.success;

  return (
    <>
      <Modal title={mobile} show={visible} setShow={setVisible}>
        <CustomerForm
          {...props}
          mobile={mobile}
          originalMobile={props.mobile}
        />
      </Modal>

      <Pressable
        onPress={() => setVisible(true)}
        style={({ pressed }) => [
          { gap: 4, paddingVertical: 12, paddingHorizontal: 16 },
          pressed &&
            !props.remarks && {
              backgroundColor: theme.primary + '22',
            },
          {
            backgroundColor,
          },
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Typography color={color} family="BOLD">
            {mobile}
          </Typography>

          <Pressable onPress={() => Linking.openURL('tel:' + props.mobile)}>
            <Typography color={color}>Dial</Typography>
          </Pressable>
        </View>

        <View
          style={{
            gap: 10,
            flexDirection: 'row',
          }}
        >
          <View style={{ flex: 1 }}>
            <Typography color={color} size="sm">
              Record
            </Typography>
          </View>

          <Pressable
            style={{ flex: 1 }}
            onPress={() => Linking.openURL('sms:' + props.mobile)}
          >
            <Typography color={color} size="sm" align="center">
              Send SMS
            </Typography>
          </Pressable>

          <Pressable
            style={{ flex: 1 }}
            onPress={() =>
              Linking.openURL(
                `whatsapp://send?phone=${props.mobile}&text=Hello`
              ).catch((error) => {
                toastShow({
                  type: 'error',
                  text: error.message,
                });
              })
            }
          >
            <Typography color={color} size="sm" align="right">
              WhatsApp
            </Typography>
          </Pressable>
        </View>
      </Pressable>
    </>
  );
}
