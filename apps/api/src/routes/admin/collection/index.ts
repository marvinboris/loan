import express from 'express';
import { CollectionController } from './controller';
import { authenticate, authorize } from '../../../middlewares';

const collectionRouter = express.Router();

const collectionController = new CollectionController();

// Collection routes
collectionRouter.get(
  '/performance-management/monthly',
  authenticate,
  authorize('admin'),
  collectionController.getMonthlyPerformance
);
collectionRouter.get(
  '/performance-management/daily',
  authenticate,
  authorize('admin'),
  collectionController.getDailyPerformance
);
collectionRouter.get(
  '/performance-management/team-monthly',
  authenticate,
  authorize('admin'),
  collectionController.getTeamMonthlyPerformance
);
collectionRouter.get(
  '/performance-management/team-daily',
  authenticate,
  authorize('admin'),
  collectionController.getTeamDailyPerformance
);
collectionRouter.get(
  '/case',
  authenticate,
  authorize('admin'),
  collectionController.getCollectionCase
);
collectionRouter.get(
  '/case-allocation',
  authenticate,
  authorize('admin'),
  collectionController.getCaseAllocation
);
collectionRouter.get(
  '/records',
  authenticate,
  authorize('admin'),
  collectionController.getCollectionRecords
);

export { collectionRouter };
