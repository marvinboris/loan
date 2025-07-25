import express from 'express';
import { OperationController } from './controller';
import { authenticate, authorize } from '../../../middlewares';

const operationRouter = express.Router();

const operationController = new OperationController();

// Operation routes
operationRouter.get(
  '/account',
  authenticate,
  authorize('admin'),
  operationController.getAccounts
);
operationRouter.post(
  '/account',
  authenticate,
  authorize('admin'),
  operationController.createAccount
);

export { operationRouter };
