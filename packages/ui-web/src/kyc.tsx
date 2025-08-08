import { Formik } from 'formik';
import React from 'react';
import { Button } from './buttons';
import { Card } from './card';
import { Switch, TextArea } from './form';
import { Modal } from './modal';
import { toastShow } from './toast';

export type KycFormValues = {
  id: number;
  validated: boolean;
  reason?: string;
};

export type KycProps = {
  uploadsUrl: string;
  values: {
    id: number;

    first_name?: string;
    last_name: string;
    location: string;
    birthdate: string;
    emergency_number_1: string;
    emergency_number_2?: string;
    front_photo: string;
    back_photo: string;
    selfie: string;
  };
  onSubmit(
    values: KycFormValues
  ): Promise<{ message: string; success: boolean }>;
};

export function Kyc({ uploadsUrl, values, onSubmit }: KycProps) {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <KycForm
        values={values}
        show={show}
        setShow={setShow}
        onSubmit={onSubmit}
        uploadsUrl={uploadsUrl}
      />

      <Button onClick={() => setShow(true)}>KYC</Button>
    </>
  );
}

function KycForm({
  show,
  setShow,
  values,
  onSubmit,
  uploadsUrl,
}: KycProps & {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const initialValues: KycFormValues = {
    id: values.id,
    validated: false,
  };

  return (
    <Modal show={show} setShow={setShow} title="KYC validation form">
      <Card className="mb-2.5">
        <div className="*:flex *:justify-between *:*:*:last:font-bold">
          <div>
            <div>First name</div>
            <div>
              <span>{values.first_name}</span>
            </div>
          </div>

          <div>
            <div>Last name</div>
            <div>
              <span>{values.last_name}</span>
            </div>
          </div>

          <div>
            <div>Location</div>
            <div>
              <span>{values.location}</span>
            </div>
          </div>

          <div>
            <div>Birthdate</div>
            <div>
              <span>{values.birthdate}</span>
            </div>
          </div>

          <div>
            <div>Emergency number 1</div>
            <div>
              <span>{values.emergency_number_1}</span>
            </div>
          </div>

          {values.emergency_number_2 ? (
            <div>
              <div>Emergency number 2</div>
              <div>
                <span>{values.emergency_number_2}</span>
              </div>
            </div>
          ) : null}
        </div>

        <div>
          <div>Front photo</div>
          <div>
            <img src={uploadsUrl + values.front_photo} alt="Document front" />
          </div>
        </div>

        <div>
          <div>Back photo</div>
          <div>
            <img src={uploadsUrl + values.back_photo} alt="Document back" />
          </div>
        </div>

        <div>
          <div>Selfie</div>
          <div>
            <img src={uploadsUrl + values.selfie} alt="Selfie" />
          </div>
        </div>
      </Card>

      <Formik
        initialValues={initialValues}
        onSubmit={async (data) => {
          const result = await onSubmit(data);
          if (result.success) {
            toastShow({ type: 'success', text: result.message });
            setShow(false);
          }
        }}
      >
        {({
          handleChange,
          handleSubmit,
          setFieldValue,
          values,
          isSubmitting,
        }) => (
          <form
            className="flex flex-col gap-2.5"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input type="hidden" value={values.id} />

            <Switch
              label="Validate ?"
              checked={values.validated}
              onChange={(value) => setFieldValue('validated', value)}
            />

            <TextArea
              label="Reason for denying"
              value={values.reason}
              onChange={handleChange('reason')}
            />

            <Button loading={isSubmitting}>Submit</Button>
          </form>
        )}
      </Formik>
    </Modal>
  );
}
