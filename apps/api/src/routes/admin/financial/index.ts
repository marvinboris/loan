import express from 'express';
import { FinancialController } from './controller';
import { authenticate, authorize } from '../../../middlewares';

const financialRouter = express.Router();

const financialController = new FinancialController();

// Financial routes
financialRouter.get(
  '/repayment-inquiries',
  authenticate,
  authorize('admin'),
  financialController.getRepaymentInquiries
);
financialRouter.get(
  '/loan-inquiry',
  authenticate,
  authorize('admin'),
  financialController.getLoanInquiry
);
financialRouter.get(
  '/reconciliation',
  authenticate,
  authorize('admin'),
  financialController.getReconciliation
);

export { financialRouter };
