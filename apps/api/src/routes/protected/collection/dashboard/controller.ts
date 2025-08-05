import { NextFunction, Request, Response } from 'express';
import { supabase } from '../../../../lib';
import { Loan } from '../../../../types';

export class DashboardController {
  async get(req: Request, res: Response, next: NextFunction) {
    const { data, error } = await supabase
      .from('loans')
      .select('*')
      .eq('collector_id', req.user.id)
      .eq('loan_status', 'pending')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error)
      return res.status(400).json({
        success: false,
        message: error.message,
      });

    res.json({
      success: true,
      dayRevenue: '-/-',
      monthRevenue: '-/-',
      requestHistory: 0,
      reimbursementRate: 0,
      target: 0,
      collectionAmount: 0,
      requests: data as Loan[],
    } satisfies {
      dayRevenue: string;
      monthRevenue: string;
      requestHistory: number;
      reimbursementRate: number;
      target: number;
      collectionAmount: number;
      requests: Loan[];
      success: boolean;
    });
  }
}
