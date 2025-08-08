import { NextFunction, Request, Response } from 'express';
import { supabase } from '../../../../lib';
import { MarkAsDoneInput } from './interfaces';

export class MarkAsDoneController {
  async post(req: Request, res: Response, next: NextFunction) {
    const { mobile, ...input }: MarkAsDoneInput = req.body;

    const { error } = await supabase
      .from('customers')
      .update({
        // type: 'registered',
        desc_follow_up: `
        Situation: ${+input.callSituation ? 'Connected' : 'Disconnected'}\n
        Wishes: ${input.wishes}\n
        Rejection issues: ${
          {
            high_service_fee: 'High service fee',
            not_interested: 'Not interested',
            short_payment_duration: 'Short payment duration',
            will_apply_later: 'Will apply later',
          }[input.rejectionIssues]
        }\n
        Send the link: ${+input.whetherSendLink ? 'Yes' : 'No'}`,
        follow_up_results: input.remark,
        latest_follow_up_time: new Date().toISOString(),
        whether_apply: true,
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
