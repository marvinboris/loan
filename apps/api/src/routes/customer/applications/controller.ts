import { NextFunction, Request, Response } from 'express';
import { supabase } from '../../../lib/supabase';

export class ApplicationsController {
  async get(req: Request, res: Response, next: NextFunction) {
    const { data, error } = await supabase
      .from('loans')
      .select('*')
      .eq('customer_id', req.user.id)
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
