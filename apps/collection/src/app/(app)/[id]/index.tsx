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
          value={'#' + collection.detail.loanNumber}
        />
        <TextLine label="Product name" value={collection.detail.productName} />
        <TextLine label="Name" value={collection.detail.name} />
        <TextLine label="Mobile" value={collection.detail.mobile} />
        <TextLine label="Gender" value={collection.detail.gender} />
        <TextLine
          label="Reimbursement time"
          value={collection.detail.reimbursementTime}
        />
        <TextLine label="Request date" value={collection.detail.date} />
        <TextLine
          label="Reimbursement total"
          value={collection.detail.total.toLocaleString('en')}
        />
        <TextLine
          label="Reimbursement amount"
          value={collection.detail.amount.toLocaleString('en')}
        />
        <TextLine
          label="Real amount"
          value={collection.detail.realAmount.toLocaleString('en')}
        />
        <TextLine
          label="Service fees"
          value={collection.detail.serviceFees.toLocaleString('en')}
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
          value={collection.detail.lateDays.toString()}
        />
      </View>

      <Add show={adding} setShow={setAdding} />

      <Button
        title="Add remark"
        onPress={() => setAdding(true)}
        containerStyle={{ alignItems: 'center' }}
      />
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
  const { id } = useLocalSearchParams<{ id: string }>();

  const initialValues: FormValues = {
    connection: '',
    willingnessToPay: '',
    location: '',
    contactTarget: '',
    collectionResult: '',
    remark: '',
  };

  return (
    <Modal show={show} setShow={setShow} title="Add remark">
      <Formik
        initialValues={initialValues}
        onSubmit={async (data) => {
          const result = await collectionService.addMark(id, data);
          if (result.success)
            toastShow({ type: 'success', text: result.message });
        }}
      >
        {({ errors, handleChange, handleSubmit, values }) => (
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
                high: 'High',
                medium: 'Medium',
                low: 'Low',
                refusal: 'Refusal',
              }}
            />

            <Select
              id="location"
              name="location"
              label="Location"
              error={errors.location}
              value={values.location}
              placeholder="Select location"
              onChange={handleChange('location')}
              options={{}}
            />

            <Select
              id="contactTarget"
              name="contactTarget"
              label="Contact target"
              error={errors.contactTarget}
              value={values.contactTarget}
              placeholder="Select contact target"
              onChange={handleChange('contactTarget')}
              options={{}}
            />

            <Select
              id="collectionResult"
              name="collectionResult"
              label="Collection result"
              error={errors.collectionResult}
              value={values.collectionResult}
              placeholder="Select collection result"
              onChange={handleChange('collectionResult')}
              options={{}}
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

            <Button title="Submit" onPress={() => handleSubmit()} />
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
