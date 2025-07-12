import express from 'express';
import { TelemarketingController } from './controller';
import { authenticate, authorize } from '../../middlewares';

const telemarketingRouter = express.Router();

const telemarketingController = new TelemarketingController();

// Telemarketing routes
telemarketingRouter.get(
  '/performance-management/monthly',
  authenticate,
  authorize(['admin', 'telemarketer']),
  telemarketingController.getMonthlyPerformance
);
telemarketingRouter.get(
  '/performance-management/daily',
  authenticate,
  authorize(['admin', 'telemarketer']),
  telemarketingController.getDailyPerformance
);
telemarketingRouter.get(
  '/performance-management/team-monthly',
  authenticate,
  authorize(['admin', 'telemarketer']),
  telemarketingController.getTeamMonthlyPerformance
);
telemarketingRouter.get(
  '/performance-management/team-daily',
  authenticate,
  authorize(['admin', 'telemarketer']),
  telemarketingController.getTeamDailyPerformance
);
telemarketingRouter.get(
  '/new-customers',
  authenticate,
  authorize(['admin', 'telemarketer']),
  telemarketingController.getNewCustomers
);
telemarketingRouter.get(
  '/old-customers',
  authenticate,
  authorize(['admin', 'telemarketer']),
  telemarketingController.getOldCustomers
);
telemarketingRouter.get(
  '/registered-customers',
  authenticate,
  authorize(['admin', 'telemarketer']),
  telemarketingController.getRegisteredCustomers
);

export { telemarketingRouter };
