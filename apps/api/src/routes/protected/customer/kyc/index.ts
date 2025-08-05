import express from 'express';
import { upload } from '../../../../lib';
import { KycController } from './controller';
import { submitValidator } from './validators';

const kycRouter = express.Router();

const kycController = new KycController();

kycRouter.post(
  '/',
  upload.fields([
    { name: 'frontPhoto' },
    { name: 'backPhoto' },
    { name: 'selfie' },
  ]),
  submitValidator,
  kycController.submit
);

export { kycRouter };
