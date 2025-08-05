import express from 'express';
import { applicationsRouter } from './applications';
import { beneficiaryRouter } from './beneficiary';
import { borrowRouter } from './borrow';
import { dashboardRouter } from './dashboard';
import { kycRouter } from './kyc';
import { repayRouter } from './repay';

const customerRouter = express.Router();

customerRouter.use('/dashboard', dashboardRouter);
customerRouter.use('/kyc', kycRouter);
customerRouter.use('/applications', applicationsRouter);
customerRouter.use('/borrow', borrowRouter);
customerRouter.use('/repay', repayRouter);
customerRouter.use('/beneficiary', beneficiaryRouter);

export { customerRouter };
