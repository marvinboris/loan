import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { supabase } from '../../../../lib';
import { SubmitInput, VerifyInput } from './interfaces';
import { beneficiaryService } from './service';

export class BeneficiaryController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('account')
        .eq('id', req.user.id)
        .single();

      if (error) throw error;

      res.json(data.account);
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
      const result = await beneficiaryService.submit(req.body as SubmitInput);

      res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      next(error);
    }
  }

  async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await beneficiaryService.verify(req.body as VerifyInput);

      res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      next(error);
    }
  }
}
