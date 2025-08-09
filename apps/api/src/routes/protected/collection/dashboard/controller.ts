import { NextFunction, Request, Response } from 'express';
import { supabase } from '../../../../lib';
import { Loan, LoanStatus } from '../../../../types';
import moment from 'moment';

export class DashboardController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const query = supabase
        .from('loans')
        .select(
          `
        *,
        repayments:repayments (*),
        collection_records:collection_records (*)
        `,
          { count: 'exact' }
        )
        .eq('collector_id', req.user.id)
        .in('loan_status', [LoanStatus.ACCEPTED, LoanStatus.REPAID])
        .order('due_date', { ascending: false });

      const day = await query
        .gte('due_date', moment().startOf('day'))
        .lt('due_date', moment().endOf('day'));
      const week = await query
        .gte('due_date', moment().startOf('week'))
        .lt('due_date', moment().endOf('week'));
      const pending = await query.eq('loan_status', LoanStatus.ACCEPTED);
      const all = await query;

      const error = day.error || week.error || pending.error || all.error;

      if (error) throw error;

      let fullPayments = 0;
      let partialPayments = 0;
      day.data.forEach((item) => {
        const waitedAmt = item.total_repayment - item.amount_repaid;
        const perceivedAmt = item.repayments
          .filter((item) => moment(item.created_at).isSame(moment(), 'day'))
          .reduce((a, b) => a + b.repayment_amount, 0);
        const full = waitedAmt === perceivedAmt;
        if (full) fullPayments++;
        else if (perceivedAmt > 0) partialPayments++;
      });

      const weekPerformance = week.data.filter((item) => {
        const waitedAmt = item.total_repayment - item.amount_repaid;
        return (
          waitedAmt ===
          item.repayments
            .filter((item) => moment(item.created_at).isSame(moment(), 'week'))
            .reduce((a, b) => a + b.repayment_amount, 0)
        );
      }).length;

      const collectionAmount = all.data.reduce(
        (a, item) =>
          a + item.repayments.reduce((a, b) => a + b.repayment_amount, 0),
        0
      );

      res.json({
        success: true,
        fullPayments: !day.count ? '-' : `${fullPayments}/${day.count}`,
        partialPayments: !day.count ? '-' : `${partialPayments}/${day.count}`,
        weekPerformance: !week.count ? '-' : `${weekPerformance}/${week.count}`,
        totalTickets: all.count,
        target: 0,
        collectionAmount,
        requests: pending.data as Loan[],
      });
    } catch (error) {
      next(error);
    }
  }
}
