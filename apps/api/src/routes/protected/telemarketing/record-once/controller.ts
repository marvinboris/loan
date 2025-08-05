import { NextFunction, Request, Response } from 'express';
import { supabase } from '../../../../lib';
import { RecordOnceInput } from './interfaces';

export class RecordOnceController {
  async post(req: Request, res: Response, next: NextFunction) {
    const { mobile, ...input }: RecordOnceInput = req.body;

    const { error } = await supabase
      .from('customers')
      .update({
        follow_up_results: input.remark,
        desc_follow_up: input.reason,
        latest_follow_up_time: new Date().toISOString(),
      })
      .eq('mobile', mobile);

    if (error)
      return res.status(400).json({ success: false, message: error.message });

    res.json({
      success: true,
      message: 'Customer status updated (recorded once)',
    });
  }
}
