import express from 'express';
import { DashboardController } from './controller';
import { authenticate, authorize } from '../../../middlewares';

const dashboardRouter = express.Router();

const dashboardController = new DashboardController();

dashboardRouter.get(
  '/',
  authenticate,
  authorize('telemarketer'),
  dashboardController.get
);

export { dashboardRouter };
