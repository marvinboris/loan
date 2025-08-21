import { Kyc, KycStatus, Loan, LoanStatus } from '../../../../types';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import moment from 'moment';
import { supabase } from '../../../../lib';
import { filter } from '../../../../utils';

export class CbordController {
  async getMarketing(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result: Record<
        string,
        { kyc: number; borrow: number; amount: number }
      > = {};

      const { data: kyc } = await supabase
        .from('kyc')
        .select()
        .eq('status', KycStatus.SUCCESS);
      const { data: borrow } = await supabase
        .from('loans')
        .select()
        .in('loan_status', [LoanStatus.ACCEPTED, LoanStatus.REPAID]);

      kyc.forEach((item) => {
        const date = moment(item.updated_at).format('YYYY-MM-DD');
        if (!(date in result)) result[date] = { kyc: 0, borrow: 0, amount: 0 };
        result[date].kyc++;
      });

      borrow.forEach((item) => {
        const date = moment(item.due_date)
          .subtract(1, 'week')
          .format('YYYY-MM-DD');
        if (!(date in result)) result[date] = { kyc: 0, borrow: 0, amount: 0 };
        result[date].borrow++;
        result[date].amount += item.total_repayment;
      });

      const total = Object.keys(result).length;
      const items = Object.entries(result)
        .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
        .map(([date, data]) => ({
          date,
          ...data,
        }));

      res.json({
        success: true,
        items,
        total,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCollection(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result: Record<
        string,
        { all: number; remaining: number; dpd: number }
      > = {};

      const { data: borrow } = await supabase
        .from('loans')
        .select()
        .in('loan_status', [LoanStatus.ACCEPTED, LoanStatus.REPAID]);

      borrow.forEach((item) => {
        const date = moment(item.due_date).format('YYYY-MM-DD');
        if (!(date in result)) result[date] = { all: 0, remaining: 0, dpd: 0 };
        result[date].all++;
        if (item.loan_status === LoanStatus.ACCEPTED) result[date].remaining++;
      });

      const total = Object.keys(result).length;
      const items = Object.entries(result)
        .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
        .map(([date, data]) => ({
          date,
          ...data,
          dpd: data.all ? (data.remaining * 100) / data.all : 0,
        }));

      res.json({
        success: true,
        items,
        total,
      });
    } catch (error) {
      next(error);
    }
  }
}
