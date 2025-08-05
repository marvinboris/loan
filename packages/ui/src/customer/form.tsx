import { Formik } from 'formik';
import { View } from 'react-native';
import { Button } from '../button';
import { Form } from '../form';
import { Select } from '../select';
import { TextAreaInput } from '../text-area-input';
import { TextLine } from '../text-line';

type FormValues = {
  mobile: string;
  callSituation: string;
  reason?: string;
  wishes?: string;
  rejectionIssues?: string;
  whetherSendLink?: string;
  remark?: string;
};

export type CustomerProps = {
  mobile: string;

  onSubmit(data: FormValues): void;
  onRecordOnce(data: FormValues): void;
};

export function CustomerForm({
  mobile,
  onSubmit,
  onRecordOnce,
}: CustomerProps) {
  const initialValues: FormValues = {
    mobile,
    callSituation: '',
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ errors, handleChange, handleSubmit, values }) => (
        <Form>
          <View style={{ marginHorizontal: -16 }}>
            <TextLine label="Mobile" value={mobile} />
            <TextLine label="Sales method" value="Phone sales" />
            <TextLine label="Dial time" value={new Date().toLocaleString()} />
          </View>

          <Select
            id="callSituation"
            name="callSituation"
            label="Call situation"
            error={errors.callSituation}
            value={values.callSituation}
            placeholder="Select an option"
            onChange={handleChange('callSituation')}
            options={{ 1: 'Connected', 0: 'Disconnected' }}
          />

          {values.callSituation === '1' ? (
            <>
              <Select
                id="wishes"
                name="wishes"
                error={errors.wishes}
                value={values.wishes}
                label="Customer wishes"
                placeholder="Select an option"
                onChange={handleChange('wishes')}
                options={{
                  applying: 'Applying',
                  not_applying: 'Not applying',
                }}
              />

              <Select
                options={{
                  '': 'None',
                  high_service_fee: 'High service fee',
                  short_payment_duration: 'Short payment duration',
                  not_interested: 'Not interested',
                  will_apply_later: 'Will apply later',
                }}
                id="rejectionIssues"
                name="rejectionIssues"
                placeholder="Select an option"
                error={errors.rejectionIssues}
                value={values.rejectionIssues}
                label="Customer rejection issues"
                onChange={handleChange('rejectionIssues')}
              />

              <Select
                options={{
                  1: 'Yes',
                  0: 'No',
                }}
                id="whetherSendLink"
                name="whetherSendLink"
                error={errors.whetherSendLink}
                value={values.whetherSendLink}
                placeholder="Select an option"
                label="Whether to send the link"
                onChange={handleChange('whetherSendLink')}
              />

              <TextAreaInput
                id="remark"
                name="remark"
                label="Remark"
                error={errors.remark}
                value={values.remark}
                placeholder="Select a remark"
                onChange={handleChange('remark')}
              />
            </>
          ) : (
            <Select
              id="reason"
              name="reason"
              options={{
                offline: 'Offline',
                busy: 'Busy',
                shutdown: 'Shutdown',
              }}
              error={errors.reason}
              value={values.reason}
              placeholder="Select a reason"
              label="Reason for not connecting"
              onChange={handleChange('reason')}
            />
          )}

          <View style={{ flexDirection: 'row', gap: 4, marginTop: 16 }}>
            <Button
              type="clear"
              title="Record once"
              containerStyle={{ flex: 1 }}
              onPress={() => onRecordOnce(values)}
            />

            <Button
              color="primary"
              title="Mark complete"
              containerStyle={{ flex: 1 }}
              onPress={() => handleSubmit()}
            />
          </View>
        </Form>
      )}
    </Formik>
  );
}
