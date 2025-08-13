import {
  CreateMarketingRecordInput,
  MarketingRecordReason,
  MarketingRecordRejectionIssues,
} from '../../../../types';
import { NextFunction, Request, Response } from 'express';
import { supabase } from '../../../../lib';
import { RecordOnceInput } from './interfaces';

export class RecordOnceController {
  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const { mobile, ...input }: RecordOnceInput = req.body;

      const { data: customer, error } = await supabase
        .from('customers')
        .update({
          latest_follow_up_time: new Date().toISOString(),
        })
        .eq('mobile', mobile)
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
        message: 'Customer status updated (recorded once)',
      });
    } catch (error) {
      next(error);
    }
  }
}
