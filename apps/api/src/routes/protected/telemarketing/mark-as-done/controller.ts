import { NextFunction, Request, Response } from 'express';
import { supabase } from '../../../../lib';
import { MarkAsDoneInput } from './interfaces';

export class MarkAsDoneController {
  async post(req: Request, res: Response, next: NextFunction) {
    const { mobile, ...input }: MarkAsDoneInput = req.body;

    const { error } = await supabase
      .from('customers')
      .update({
        type: 'registered',
        follow_up_results: input.remark,
        desc_follow_up: input.reason,
        latest_follow_up_time: new Date().toISOString(),
      })
      .eq('mobile', mobile);

    if (error)
      return res.status(400).json({ success: false, message: error.message });

    res.json({
      success: true,
      message: 'Customer marked as done successfully',
    });
  }
}
