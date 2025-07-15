import express from 'express';
import multer, { Multer } from 'multer';
import { TelemarketingController } from './controller';
import { authenticate, authorize } from '../../../middlewares';
import { CustomerType } from '../../../types';

const telemarketingRouter = express.Router();

const telemarketingController = new TelemarketingController();

const upload: Multer = multer({ storage: multer.memoryStorage() });

// Telemarketing routes
telemarketingRouter.get(
  '/performance-management/monthly',
  authenticate,
  authorize(['admin']),
  telemarketingController.getMonthlyPerformance
);
telemarketingRouter.get(
  '/performance-management/daily',
  authenticate,
  authorize(['admin']),
  telemarketingController.getDailyPerformance
);
telemarketingRouter.get(
  '/performance-management/team-monthly',
  authenticate,
  authorize(['admin']),
  telemarketingController.getTeamMonthlyPerformance
);
telemarketingRouter.get(
  '/performance-management/team-daily',
  authenticate,
  authorize(['admin']),
  telemarketingController.getTeamDailyPerformance
);
telemarketingRouter.get(
  '/new-customers',
  authenticate,
  authorize(['admin']),
  telemarketingController.getNewCustomers
);
telemarketingRouter.post(
  '/new-customers/import',
  authenticate,
  authorize(['admin']),
  upload.single('file'),
  telemarketingController.postImportCustomers(CustomerType.NEW)
);
telemarketingRouter.get(
  '/old-customers',
  authenticate,
  authorize(['admin']),
  telemarketingController.getOldCustomers
);
telemarketingRouter.post(
  '/old-customers/import',
  authenticate,
  authorize(['admin']),
  upload.single('file'),
  telemarketingController.postImportCustomers(CustomerType.OLD)
);
telemarketingRouter.get(
  '/registered-customers',
  authenticate,
  authorize(['admin']),
  telemarketingController.getRegisteredCustomers
);
telemarketingRouter.post(
  '/registered-customers/import',
  authenticate,
  authorize(['admin']),
  upload.single('file'),
  telemarketingController.postImportCustomers(CustomerType.REGISTERED)
);

export { telemarketingRouter };
