import { NextFunction, Request, Response } from 'express';
import { supabase } from '../../../../lib';

export class ApplicationsController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { data, error } = await supabase
        .from('loans')
        .select()
        .eq('customer_id', req.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}
