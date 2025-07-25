import express from 'express';
import { submitValidator, verifyValidator } from './validators';
import { BeneficiaryController } from './controller';

const beneficiaryRouter = express.Router();

const beneficiaryController = new BeneficiaryController();

beneficiaryRouter.post('/', submitValidator, beneficiaryController.submit);
beneficiaryRouter.post(
  '/verify',
  verifyValidator,
  beneficiaryController.verify
);

export { beneficiaryRouter };
