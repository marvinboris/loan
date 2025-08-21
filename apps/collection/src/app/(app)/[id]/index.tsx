import { TextLine } from '@creditwave/ui';
import React from 'react';
import { View } from 'react-native';
import { useCollection } from '../../../contexts';

export default function Page() {
  const collection = useCollection();

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
          value={collection.detail.days_overdue?.toString() || ''}
        />
      </View>
    </View>
  );
}
