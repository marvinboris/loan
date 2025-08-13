import { CustomerType, LoanStatus, TradingStatus } from '../../../../types';
import { SubmitInput } from './interfaces';
import { supabase } from '../../../../lib';
import { repay } from '../../../../utils';

export const repayService = {
  async submit(input: SubmitInput) {
    const { data: customer } = await supabase
      .from('customers')
      .select()
      .eq('id', input.customerId)
      .single();

    const success = await repay(customer.account, input.amount);
    if (!success)
      return {
        success: false,
        message: 'Repayment failed',
      };

    const { count: total } = await supabase
      .from('repayments')
      .select('id', { count: 'exact' });

    const { data, error } = await supabase
      .from('repayments')
      .insert({
        creation_time: new Date().toISOString(),
        loan_id: input.id,
        repayment_amount: input.amount,
        repayment_number: 'REP' + total,
        trading_status: TradingStatus.SUCCESS,
        real_amount: input.amount,
        payment_channel: 'Mobile',
      })
      .select()
      .single();

    const { data: loan } = await supabase
      .from('loans')
      .select()
      .eq('id', input.id)
      .single();

    const fullyRepaid =
      loan.total_repayment === (loan.amount_repaid || 0) + input.amount;

    await supabase
      .from('loans')
      .update({
        amount_repaid: input.amount,
        ...(fullyRepaid
          ? {
              loan_status: LoanStatus.REPAID,
            }
          : {}),
      })
      .eq('id', input.id);

    await supabase
      .from('customers')
      .update({
        prev_repayment_time: new Date().toISOString(),
        ...(fullyRepaid && customer.type === 'new'
          ? {
              type: CustomerType.OLD,
            }
          : {}),
      })
      .eq('id', input.customerId);

    if (error || !data) return { success: false, message: 'Repayment failed' };

    return {
      success: true,
      message: 'Repayment made successfully',
    };
  },
};
