import express from 'express';
import { dashboardRouter } from './dashboard';
import { markAsDoneRouter } from './mark-as-done';
import { recordOnceRouter } from './record-once';

const telemarketingRouter = express.Router();

telemarketingRouter.use('/dashboard', dashboardRouter);
telemarketingRouter.use('/mark-as-done', markAsDoneRouter);
telemarketingRouter.use('/record-once', recordOnceRouter);

export { telemarketingRouter };
