import express from 'express';
import { upload } from '../../../../lib';
import { BorrowController } from './controller';
import { submitValidator } from './validators';

const borrowRouter = express.Router();

const borrowController = new BorrowController();

borrowRouter.get('/', borrowController.check);
borrowRouter.post(
  '/',
  upload.single('photo'),
  submitValidator,
  borrowController.submit
);

export { borrowRouter };
