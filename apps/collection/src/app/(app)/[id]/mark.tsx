import {
  Button,
  CollectionRecord,
  Form,
  Modal,
  Section,
  Select,
  TextAreaInput,
  toastShow,
} from '@creditwave/ui';
import { useLocalSearchParams } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { useCollection } from '../../../contexts';
import { collectionService } from '../../../services';

export default function Page() {
  const collection = useCollection();
  const [adding, setAdding] = React.useState(false);

  if (!collection) return null;
  return (
    <>
      <Add show={adding} setShow={setAdding} />

      <Section bodyStyle={{ gap: 8 }}>
        {collection.canAddRemark && (
          <Button
            title="Add remark"
            onPress={() => setAdding(true)}
            containerStyle={{ alignItems: 'center' }}
          />
        )}

        {(collection.mark || []).map((item, index) => (
          <CollectionRecord key={index} {...item} />
        ))}
      </Section>
    </>
  );
}

type FormValues = {
  connection: string;
  willingnessToPay: string;
  location: string;
  contactTarget: string;
  collectionResult: string;
  remark: string;
};

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
