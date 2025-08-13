import { NextFunction, Request, Response } from 'express';
import { supabase } from '../../../../lib';

export class DashboardController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select(
          `
          *,
          marketing_records:marketing_records (id)
          `
        )
        .eq('telemarketer_id', req.user.id)
        .is('app_time', null)
        .order('created_at', { ascending: false });

      if (error) throw error;

      res.json({
        success: true,
        data: data.map((item) => ({
          ...item,
          remarks: item.marketing_records.length,
        })),
      });
    } catch (error) {
      next(error);
    }
  }
}
