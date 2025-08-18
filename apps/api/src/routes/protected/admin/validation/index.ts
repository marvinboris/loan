import express from 'express';
import { ValidationController } from './controller';

const validationRouter = express.Router();

const validationController = new ValidationController();

// Validation routes
validationRouter.get('/kyc', validationController.getKyc);
validationRouter.get('/borrow', validationController.getBorrow);
validationRouter.post('/kyc', validationController.postKycValidation);
validationRouter.post('/borrow', validationController.postBorrowValidation);
validationRouter.post(
  '/borrow-cancellation',
  validationController.postBorrowCancellation
);

export { validationRouter };
