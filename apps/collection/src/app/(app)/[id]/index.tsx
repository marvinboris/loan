import {
  Button,
  Form,
  Modal,
  Select,
  TextAreaInput,
  TextLine,
  toastShow,
} from '@creditwave/ui';
import { useLocalSearchParams } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { useCollection } from '../../../contexts';
import { collectionService } from '../../../services';

type FormValues = {
  connection: string;
  willingnessToPay: string;
  location: string;
  contactTarget: string;
  collectionResult: string;
  remark: string;
};

export default function Page() {
  const collection = useCollection();
  const [adding, setAdding] = React.useState(false);

  if (!collection) return null;
  return (
    <View style={{ gap: 8 }}>
      <View style={{ paddingVertical: 16 }}>
        <TextLine
          label="Loan number"
          value={'#' + collection.detail.loan_number}
        />
        <TextLine label="Product name" value={collection.detail.product_name} />
        <TextLine label="Name" value={collection.detail.name} />
        <TextLine label="Mobile" value={collection.detail.mobile} />
        <TextLine label="Gender" value={collection.detail.gender} />
        <TextLine
          label="Reimbursement time"
          value={collection.detail.due_date}
        />
        <TextLine label="Request date" value={collection.detail.created_at} />
        <TextLine
          label="Reimbursement total"
          value={collection.detail.total_repayment.toLocaleString('en')}
        />
        <TextLine
          label="Reimbursement amount"
          value={collection.detail.loan_amount.toLocaleString('en')}
        />
        <TextLine
          label="Real amount"
          value={collection.detail.real_amount.toLocaleString('en')}
        />
        <TextLine
          label="Service fees"
          value={collection.detail.service_fees.toLocaleString('en')}
        />
        <TextLine
          label="Interest"
          value={collection.detail.interest.toLocaleString('en')}
        />
        <TextLine
          label="Penalty"
          value={collection.detail.penalty.toLocaleString('en')}
        />
        <TextLine
          label="Late days"
          value={collection.detail.days_overdue.toString()}
        />
      </View>

      <Add show={adding} setShow={setAdding} />

      {collection.canAddRemark && (
        <Button
          title="Add remark"
          onPress={() => setAdding(true)}
          containerStyle={{ alignItems: 'center' }}
        />
      )}
    </View>
  );
}

function Add({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (show: boolean) => void;
}) {
  const collection = useCollection();
  const { id } = useLocalSearchParams<{ id: string }>();

  const initialValues: FormValues = {
    connection: '',
    willingnessToPay: '',
    location: '',
    contactTarget: '',
    collectionResult: '',
    remark: '',
  };

  if (!collection) return null;
  return (
    <Modal show={show} setShow={setShow} title="Add remark">
      <Formik
        initialValues={initialValues}
        onSubmit={async (data) => {
          const result = await collectionService.addMark(id, data);
          if (result.success) {
            toastShow({ type: 'success', text: result.message });
            collection.refetch();
            setShow(false);
          }
        }}
      >
        {({ errors, handleChange, handleSubmit, values, isSubmitting }) => (
          <Form>
            <Select
              id="connection"
              name="connection"
              label="Connection"
              error={errors.connection}
              value={values.connection}
              placeholder="Select connection"
              onChange={handleChange('connection')}
              options={{
                connected: 'Connected',
                no_answer: 'No answer',
                wrong_number: 'Wrong number',
              }}
            />

            <Select
              id="willingnessToPay"
              name="willingnessToPay"
              label="Willingness to pay"
              error={errors.willingnessToPay}
              value={values.willingnessToPay}
              placeholder="Select willingnessToPay"
              onChange={handleChange('willingnessToPay')}
              options={{
                high: 'Yes',
                refusal: 'No',
              }}
            />

            <Select
              id="contactTarget"
              name="contactTarget"
              label="Contact target"
              error={errors.contactTarget}
              value={values.contactTarget}
              placeholder="Select contact target"
              onChange={handleChange('contactTarget')}
              options={{
                [collection.detail.mobile]: 'Self',
                [collection.kyc.emergency_number_1]:
                  collection.kyc.emergency_number_1,
                ...(collection.kyc.emergency_number_2
                  ? {
                      [collection.kyc.emergency_number_2]:
                        collection.kyc.emergency_number_2,
                    }
                  : {}),
              }}
            />

            <TextAreaInput
              id="remark"
              name="remark"
              label="Remark"
              error={errors.remark}
              value={values.remark}
              placeholder="Enter remark"
              onChange={handleChange('remark')}
            />

            <Button
              title="Submit"
              loading={isSubmitting}
              onPress={() => handleSubmit()}
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
