import { NextFunction, Request, Response } from 'express';
import { supabase } from '../../../../lib';

export class MyPerformanceController {
  async get(req: Request, res: Response, next: NextFunction) {
    const { data, error } = await supabase
      .from('loans')
      .select('*')
      .eq('collector_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error)
      return res.status(400).json({
        success: false,
        message: error.message,
      });

    res.json({
      success: true,
      data,
    });
  }
}
