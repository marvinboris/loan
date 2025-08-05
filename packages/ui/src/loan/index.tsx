import { useConfig } from '@creditwave/hooks';
import moment from 'moment';
import { Pressable, View } from 'react-native';
import { Typography } from '../typography';
import { Modal } from '../modal';
import { Card } from '../card';
import { AmountLine } from '../amount-line';
import { Formik } from 'formik';
import { toastShow } from '../toast';
import { Form } from '../form';
import { Button } from '../button';
import { NumberInput } from '../number-input';
import React from 'react';

export enum LoanStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DENIED = 'denied',
  REPAID = 'repaid',
}

export type LoanType = {
  id: number;
  loan_amount: number;
  total_repayment: number;
  amount_repaid?: number;
  due_date: string;
  loan_status: LoanStatus;
};

export type LoanFormValues = {
  id: number;

  amount: number;
};

export type LoanProps = LoanType & {
  onSubmit(
    values: LoanFormValues
  ): Promise<{ message: string; success: boolean }>;
};

export function Loan({ onSubmit, ...item }: LoanProps) {
  const { theme } = useConfig();
  const [show, setShow] = React.useState(false);

  return (
    <>
      <LoanForm
        values={item}
        onSubmit={onSubmit}
        show={show}
        setShow={setShow}
      />

      <Pressable
        onPress={
          item.loan_status === LoanStatus.ACCEPTED
            ? () => setShow(true)
            : undefined
        }
        style={({ pressed }) => [
          {
            gap: 4,
            paddingVertical: 12,
            paddingHorizontal: 16,
            marginHorizontal: -16,
          },
          pressed && { backgroundColor: theme.primary + '22' },
        ]}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography
            color={
              item.loan_status === LoanStatus.REPAID
                ? 'success'
                : item.loan_status === LoanStatus.DENIED
                ? 'error'
                : item.loan_status === LoanStatus.ACCEPTED
                ? 'secondary'
                : 'warning'
            }
          >
            {item.loan_amount} XAF
          </Typography>

          <Typography color="black">
            +{item.total_repayment - item.loan_amount}
          </Typography>
        </View>

        <Typography color="grey0">{moment(item.due_date).fromNow()}</Typography>
      </Pressable>
    </>
  );
}

function LoanForm({
  show,
  setShow,
  values,
  onSubmit,
}: {
  values: LoanType;
  onSubmit: LoanProps['onSubmit'];
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const initialValues: LoanFormValues = {
    id: values.id,
    amount: 0,
  };

  const maxAmount = React.useMemo(
    () => values.total_repayment - (values.amount_repaid || 0),
    [values.amount_repaid, values.total_repayment]
  );

  return (
    <Modal show={show} setShow={setShow} title="Repayment time">
      <Card size="sm" style={{ marginBottom: 8 }}>
        <AmountLine amount={maxAmount} label="Repayment amount" />
      </Card>

      <Formik
        initialValues={initialValues}
        onSubmit={async (data) => {
          const result = await onSubmit(data);
          if (result.success)
            toastShow({ type: 'success', text: result.message });
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <Form>
            <NumberInput
              min={0}
              step={1000}
              id="amount"
              name="amount"
              max={maxAmount}
              value={values.amount}
              onChange={(value) => setFieldValue('amount', value)}
            />

            <Button title="Repay" onPress={() => handleSubmit()} />
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
