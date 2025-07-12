import express from 'express';
import { CollectionController } from './controller';
import { authenticate, authorize } from '../../middlewares';

const collectionRouter = express.Router();

const collectionController = new CollectionController();

// Collection routes
collectionRouter.get(
  '/performance-management/monthly',
  authenticate,
  authorize(['admin', 'collector']),
  collectionController.getMonthlyPerformance
);
collectionRouter.get(
  '/performance-management/daily',
  authenticate,
  authorize(['admin', 'collector']),
  collectionController.getDailyPerformance
);
collectionRouter.get(
  '/performance-management/team-monthly',
  authenticate,
  authorize(['admin', 'collector']),
  collectionController.getTeamMonthlyPerformance
);
collectionRouter.get(
  '/performance-management/team-daily',
  authenticate,
  authorize(['admin', 'collector']),
  collectionController.getTeamDailyPerformance
);
collectionRouter.get(
  '/case',
  authenticate,
  authorize(['admin', 'collector']),
  collectionController.getCollectionCase
);
collectionRouter.get(
  '/case-allocation',
  authenticate,
  authorize(['admin', 'collector']),
  collectionController.getCaseAllocation
);
collectionRouter.get(
  '/records',
  authenticate,
  authorize(['admin', 'collector']),
  collectionController.getCollectionRecords
);

export { collectionRouter };
