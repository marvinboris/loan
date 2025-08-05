import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { SubmitInput } from './interfaces';
import { kycService } from './service';

export class KycController {
  async submit(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      Object.entries(req.files).forEach(([key, file]) => {
        req.body[key] = (file as Express.Multer.File[]).at(0).path;
      });

      req.body.customerId = req.user.id;
      const result = await kycService.submit(req.body as SubmitInput);

      res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      next(error);
    }
  }
}
