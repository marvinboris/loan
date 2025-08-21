import { KycStatus, LoanStatus } from '../../../../types';
import {
  BorrowCancellationInput,
  BorrowValidationInput,
  KycValidationInput,
} from './interfaces';
import moment from 'moment';
import { config } from '../../../../config';
import { supabase } from '../../../../lib';
import { payCustomer, sendSms } from '../../../../utils';

export const validationService = {
  async kycValidation(input: KycValidationInput) {
    const { data: kyc, error } = await supabase
      .from('kyc')
      .update({
        status: input.validated ? KycStatus.SUCCESS : KycStatus.FAILED,
      })
      .eq('id', input.id)
      .select(
        `
        *,
        customers:customer_id (mobile)
        `
      )
      .single();

    if (input.validated)
      await supabase
        .from('customers')
        .update({
          app_name: config.appName,
          name: [kyc.first_name, kyc.last_name].filter(Boolean).join(' '),
        })
        .eq('id', kyc.customer_id);

    if (error)
      return {
        success: false,
        message: 'KYC validation response not submitted',
      };

    let message;
    if (input.validated) message = 'Your KYC request has been validated.';
    else
      message =
        [
          'Your KYC application has been denied',
          input.reason
            ? 'for the following reason: ' + input.reason
            : undefined,
        ]
          .filter(Boolean)
          .join(' ') + '.';

    await sendSms(kyc.customers.mobile, message);

    return {
      success: true,
      message: 'KYC validation response submitted successfully',
    };
  },

  async borrowValidation(input: BorrowValidationInput) {
    const { data: loan, error: loanError } = await supabase
      .from('loans')
      .select(
        `
      *,
      customers:customer_id (mobile, account)
      `
      )
      .eq('id', input.id)
      .eq('loan_status', LoanStatus.PENDING)
      .single();

    if (loanError)
      return {
        success: false,
        message: 'Borrow request not found or not pending',
      };

    let error;
    if (input.validated) {
      const externalId = await payCustomer(
        loan.customers.account,
        loan.loan_amount
      );

      if (externalId) {
        const updated = await supabase
          .from('loans')
          .update({
            loan_status: LoanStatus.ACCEPTED,
            loan_order_number: externalId,
            due_date: moment().add(1, 'week').toISOString(),
          })
          .eq('id', input.id);
        error = updated.error;
      }
    } else {
      const updated = await supabase
        .from('loans')
        .update({ loan_status: LoanStatus.DENIED })
        .eq('id', input.id);
      error = updated.error;
    }

    if (error)
      return {
        success: false,
        message: 'Borrow validation response not submitted',
      };

    let message;
    if (input.validated) message = 'Your borrow request has been validated.';
    else
      message =
        [
          'Your borrow application has been denied',
          input.reason
            ? 'for the following reason: ' + input.reason
            : undefined,
        ]
          .filter(Boolean)
          .join(' ') + '.';

    await sendSms(loan.customers.mobile, message);

    return {
      success: true,
      message: 'Borrow validation response submitted successfully',
    };
  },

  async borrowCancellation(input: BorrowCancellationInput) {
    const { error } = await supabase
      .from('loans')
      .update({
        loan_status: LoanStatus.REPAID,
      })
      .eq('id', input.id);

    if (error)
      return {
        success: false,
        message: 'Borrow cancellation response not submitted',
      };

    return {
      success: true,
      message: 'Borrow cancellation response submitted successfully',
    };
  },
};
