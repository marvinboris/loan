import { KycStatus } from '../../../../types';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { SubmitInput } from './interfaces';
import { borrowService } from './service';
import { supabase } from '../../../../lib';

export class BorrowController {
  async check(req: Request, res: Response, next: NextFunction) {
    try {
      const { data, error } = await supabase
        .from('kyc')
        .select(
          `
          *,
          customers:customer_id (account)
          `
        )
        .eq('customer_id', req.user.id)
        .neq('status', KycStatus.FAILED);

      if (error) throw new Error('Supabase error: ' + error.message);

      res.json({
        success: true,
        hasKyc: Boolean(data.length),
        hasAccount: Boolean(data.at(0)?.customers?.account),
        maxAmount: 10000,
      });
    } catch (error) {
      next(error);
    }
  }

  async submit(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      req.body.customerId = req.user.id;
      req.body.photo = 'uploads/' + req.file.filename;
      const result = await borrowService.submit(req.body as SubmitInput);

      res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      next(error);
    }
  }
}
