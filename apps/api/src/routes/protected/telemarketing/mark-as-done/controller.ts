import {
  CreateMarketingRecordInput,
  MarketingRecordReason,
  MarketingRecordRejectionIssues,
} from '../../../../types';
import { NextFunction, Request, Response } from 'express';
import { supabase } from '../../../../lib';
import { MarkAsDoneInput } from './interfaces';

export class MarkAsDoneController {
  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const { mobile, ...input }: MarkAsDoneInput = req.body;

      const { data: customer, error } = await supabase
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
        })
        .in('mobile', [mobile, mobile.substring(1)])
        .select()
        .single();

      if (error) throw error;

      const insert = await supabase.from('marketing_records').insert({
        connected: input.callSituation === '1',
        customer_id: customer.id,
        telemarketer_id: customer.telemarketer_id,
        applying: input.wishes === '1',
        reason: input.reason as MarketingRecordReason,
        rejection_issues:
          input.rejectionIssues as MarketingRecordRejectionIssues,
        remark: input.remark,
        whether_send_link: input.whetherSendLink === '1',
      } satisfies CreateMarketingRecordInput);

      if (insert.error) throw insert.error;

      res.json({
        success: true,
        message: 'Customer marked as done successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
