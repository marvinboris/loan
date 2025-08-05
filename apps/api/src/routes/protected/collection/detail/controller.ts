import { NextFunction, Request, Response } from 'express';
import { supabase } from '../../../../lib';
import { MarkInput } from './interfaces';

export class DetailController {
  async get(req: Request, res: Response, next: NextFunction) {
    const { data: detail, error: detailError } = await supabase
      .from('loans')
      .select('*')
      .eq('loan_number', req.params.id)
      .single();

    if (detailError)
      return res
        .status(400)
        .json({ success: false, message: detailError.message });

    const { data: kyc, error: kycError } = await supabase
      .from('kyc')
      .select('*')
      .eq('customer_id', detail.customer_id)
      .single();

    if (kycError)
      return res
        .status(400)
        .json({ success: false, message: kycError.message });

    const { data: mark, error: markError } = await supabase
      .from('collection_records')
      .select('*')
      .eq('collector_id', req.user.id)
      .eq('loan_id', detail.id);

    if (markError)
      return res
        .status(400)
        .json({ success: false, message: markError.message });

    res.json({
      success: true,
      detail,
      kyc,
      mark,
      contacts: [],
      emergencyContacts: [],
      personalizedContacts: [],
      callHistory: [],
    });
  }

  async mark(req: Request, res: Response, next: NextFunction) {
    const input: MarkInput = req.body;

    const { error } = await supabase
      .from('collection_records')
      .insert({
        connection: input.connection,
        mark: input.remark,
        collector_id: req.user.id,
        loan_id: +req.params.id,
        contact: '',
        overdue_reason: '',
        record_content: '',
        record_time: new Date().toISOString(),
        willingness_to_pay: input.willingnessToPay,
        result: input.collectionResult,
        target_contact: input.contactTarget,
      })
      .select('id')
      .single();

    if (error)
      return res.status(400).json({ success: false, message: error.message });

    res.json({
      success: true,
      message: 'Customer status updated (marked as done)',
    });
  }
}
