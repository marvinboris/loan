import { LoanStatus } from '../../../../types';
import { NextFunction, Request, Response } from 'express';
import { supabase } from '../../../../lib';

export class DashboardController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { data, error } = await supabase
        .from('loans')
        .select('*')
        .eq('customer_id', req.user.id)
        .order('id', { ascending: false })
        .limit(5);

      if (error) throw error;

      res.json({
        success: true,
        pending: data.some((loan) => loan.loan_status === LoanStatus.PENDING),
        accepted: data.some((loan) => loan.loan_status === LoanStatus.ACCEPTED),
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}
