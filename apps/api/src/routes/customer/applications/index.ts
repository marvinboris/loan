import express from 'express';
import { ApplicationsController } from './controller';
import { authenticate, authorize } from '../../../middlewares';

const applicationsRouter = express.Router();

const applicationsController = new ApplicationsController();

applicationsRouter.get(
  '/',
  authenticate,
  authorize('customer'),
  applicationsController.get
);

export { applicationsRouter };
