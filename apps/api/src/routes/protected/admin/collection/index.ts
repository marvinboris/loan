import express from 'express';
import { CollectionController } from './controller';

const collectionRouter = express.Router();

const collectionController = new CollectionController();

// Collection routes
collectionRouter.get(
  '/performance-management/monthly',
  collectionController.getMonthlyPerformance
);
collectionRouter.get(
  '/performance-management/daily',
  collectionController.getDailyPerformance
);
collectionRouter.get(
  '/performance-management/team-monthly',
  collectionController.getTeamMonthlyPerformance
);
collectionRouter.get(
  '/performance-management/team-daily',
  collectionController.getTeamDailyPerformance
);
collectionRouter.get('/case', collectionController.getCollectionCase);
collectionRouter.get(
  '/case-allocation',
  collectionController.getCaseAllocation
);
collectionRouter.get('/records', collectionController.getCollectionRecords);
collectionRouter.get('/collectors', collectionController.getCollectors);
collectionRouter.post('/distribution', collectionController.postDistribution);

export { collectionRouter };
