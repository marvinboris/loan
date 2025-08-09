import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
import { supabase } from '../../../../lib';
import { LoanStatus } from '../../../../types';
import { MarkInput } from './interfaces';

export class DetailController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { data: detail, error: detailError } = await supabase
        .from('loans')
        .select(
          `
        *,
        customers:customer_id (name, mobile)
        `
        )
        .eq('loan_number', req.params.id)
        .single();

      if (detailError) throw detailError;

      const { data: kyc, error: kycError } = await supabase
        .from('kyc')
        .select('*')
        .eq('customer_id', detail.customer_id)
        .single();

      if (kycError) throw kycError;

      const { data: mark, error: markError } = await supabase
        .from('collection_records')
        .select('*')
        .eq('collector_id', req.user.id)
        .eq('loan_id', detail.id);

      if (markError) throw markError;

      const penalty = 0;
      const days_overdue = moment(detail.due_date).isBefore() ? 0 : 0;
      const canAddRemark =
        detail.loan_status === LoanStatus.ACCEPTED &&
        moment(mark.at(-1).created_at).isBefore(
          moment().subtract(10, 'minutes')
        );

      res.json({
        success: true,
        detail: {
          ...detail,
          due_date: moment(detail.due_date).fromNow(),
          created_at: moment(detail.created_at).format('LL'),
          name: detail.customers.name,
          mobile: detail.customers.mobile,
          real_amount: detail.loan_amount,
          service_fees: detail.total_repayment * 0.25,
          interest: detail.total_repayment * 0.05,
          penalty,
          days_overdue,
        },
        kyc,
        mark,
        canAddRemark,
      });
    } catch (error) {
      next(error);
    }
  }

  async mark(req: Request, res: Response, next: NextFunction) {
    const input: MarkInput = req.body;

    try {
      const { data: loan, error: loanError } = await supabase
        .from('loans')
        .select()
        .eq('loan_number', req.params.id)
        .single();

      if (loanError) throw loanError;

      const { error } = await supabase.from('collection_records').insert({
        connection: input.connection,
        mark: input.remark,
        collector_id: req.user.id,
        loan_id: loan.id,
        contact: '',
        overdue_reason: '',
        record_content: '',
        record_time: new Date().toISOString(),
        willingness_to_pay: input.willingnessToPay,
        result: input.collectionResult,
        target_contact: input.contactTarget,
      });

      if (error) throw error;

      res.json({
        success: true,
        message: 'Customer status updated (marked as done)',
      });
    } catch (error) {
      next(error);
    }
  }
}
