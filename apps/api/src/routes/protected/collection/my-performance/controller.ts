import { LoanStatus } from '../../../../types';
import { NextFunction, Request, Response } from 'express';
import { supabase } from '../../../../lib';

export class MyPerformanceController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { data, error } = await supabase
        .from('loans')
        .select(
          `
        *,
        customers:customer_id (name),
        collection_records:collection_records (*)
        `
        )
        .eq('collector_id', req.user.id)
        .eq('loan_status', LoanStatus.ACCEPTED)
        .order('due_date', { ascending: false });

      if (error) throw error;

      res.json({
        success: true,
        data: data.map((item) => ({ ...item, name: item.customers.name })),
      });
    } catch (error) {
      next(error);
    }
  }
}
