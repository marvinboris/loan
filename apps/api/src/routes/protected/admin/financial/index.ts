import express from 'express';
import { FinancialController } from './controller';

const financialRouter = express.Router();

const financialController = new FinancialController();

// Financial routes
financialRouter.get(
  '/repayment-inquiries',
  financialController.getRepaymentInquiries
);
financialRouter.get('/loan-inquiry', financialController.getLoanInquiry);
financialRouter.get('/reconciliation', financialController.getReconciliation);

export { financialRouter };
