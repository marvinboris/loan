import express from 'express';
import { BeneficiaryController } from './controller';
import { submitValidator, verifyValidator } from './validators';

const beneficiaryRouter = express.Router();

const beneficiaryController = new BeneficiaryController();

beneficiaryRouter.post('/', submitValidator, beneficiaryController.submit);
beneficiaryRouter.post(
  '/verify',
  verifyValidator,
  beneficiaryController.verify
);

export { beneficiaryRouter };
