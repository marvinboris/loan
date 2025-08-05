import moment from 'moment';
import { SubmitInput } from './interfaces';
import { supabase } from '../../../../lib';
import { CreateLoanInput, LoanStatus } from '../../../../types';

export const borrowService = {
  async submit(input: SubmitInput) {
    const { count: total } = await supabase
      .from('loans')
      .select('id', { count: 'exact' });

    const { data, error } = await supabase
      .from('loans')
      .insert({
        app_name: 'Credit Wave',
        loan_amount: input.amount * 0.7,
        loan_type: 'Personal',
        app_channel: 'Mobile',
        app_status: 'Up',
        app_version: '0.0.1',
        customer_id: input.customerId,
        due_date: moment().add(1, 'w').toISOString(),
        loan_number: 'LN' + total,
        loan_order_number: 'ORD' + total,
        loan_status: LoanStatus.PENDING,
        loan_tenure: 0,
        product_name: 'Credit Wave',
        repeated_borrowing: false,
        amount_repaid: 0,
        total_repayment: input.amount,
      } as CreateLoanInput)
      .select()
      .single();

    await supabase
      .from('customers')
      .update({ app_time: new Date().toISOString() })
      .eq('id', input.customerId);

    if (error || !data)
      return { success: false, message: 'Loan application submission failed' };

    return {
      success: true,
      message: 'Loan application submitted successfully',
    };
  },
};
