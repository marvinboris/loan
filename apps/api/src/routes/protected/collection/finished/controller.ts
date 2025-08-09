import { NextFunction, Request, Response } from 'express';
import { supabase } from '../../../../lib';
import { LoanStatus } from '../../../../types';

export class FinishedController {
  async get(req: Request, res: Response, next: NextFunction) {
    const { data, error } = await supabase
      .from('loans')
      .select(
        `
        *,
        customers:customer_id (name),
        repayments:repayments (*),
        collection_records:collection_records (*)
        `
      )
      .eq('collector_id', req.user.id)
      .eq('loan_status', LoanStatus.REPAID)
      .order('due_date', { ascending: false });

    if (error)
      return res.status(400).json({
        success: false,
        message: error.message,
      });

    res.json({
      success: true,
      data: data.map((item) => ({ ...item, name: item.customers.name })),
    });
  }
}
