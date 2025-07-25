import { NextFunction, Request, Response } from 'express';
import { supabase } from '../../../lib/supabase';

export class DashboardController {
  async get(req: Request, res: Response, next: NextFunction) {
    const { data, error } = await supabase
      .from('loans')
      .select('*')
      .eq('customer_id', req.user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    res.json({
      success: true,
      data,
    });
  }
}
