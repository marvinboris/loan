import { NextFunction, Request, Response } from 'express';
import { supabase } from '../../../../lib';

export class DashboardController {
  async get(req: Request, res: Response, next: NextFunction) {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('telemarketer_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    res.json({
      success: true,
      data,
    });
  }
}
