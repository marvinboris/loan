import moment from 'moment';
import { SubmitInput } from './interfaces';
import { supabase } from '../../../lib/supabase';
import { CreateLoanInput } from '../../../types';

export const borrowService = {
  async submit(input: SubmitInput) {
    const { data, error } = await supabase
      .from('loans')
      .insert({
        app_name: 'Credit Wave',
        loan_amount: input.amount,
        loan_type: '',
        app_channel: '',
        app_status: 'Up',
        app_version: '0.0.1',
        customer_id: input.customerId,
        due_date: moment().add(2, 'w').toISOString(),
        loan_number: moment().toISOString(),
        loan_order_number: '',
        loan_status: 'pending',
        loan_tenure: 0,
        product_name: 'Credit Wave',
        repeated_borrowing: false,
        amount_repaid: input.amount * 1.002,
      } as CreateLoanInput)
      .select()
      .single();

    if (error || !data)
      return { success: false, message: 'Loan creation failed' };

    return { success: true, message: 'Loan created successfully' };
  },
};
