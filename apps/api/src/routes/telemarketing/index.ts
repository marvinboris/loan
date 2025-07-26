import express from 'express';
import { dashboardRouter } from './dashboard';

const telemarketingRouter = express.Router();

telemarketingRouter.use('/dashboard', dashboardRouter);

export { telemarketingRouter };
