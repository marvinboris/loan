import express from 'express';
import { DashboardController } from './controller';

const dashboardRouter = express.Router();

const dashboardController = new DashboardController();

dashboardRouter.get('/', dashboardController.get);

export { dashboardRouter };
