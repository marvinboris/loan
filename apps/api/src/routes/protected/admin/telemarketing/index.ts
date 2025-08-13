import { CustomerType } from '../../../../types';
import express from 'express';
import multer, { Multer } from 'multer';
import { TelemarketingController } from './controller';

const telemarketingRouter = express.Router();

const telemarketingController = new TelemarketingController();

const upload: Multer = multer({ storage: multer.memoryStorage() });

// Telemarketing routes
telemarketingRouter.get(
  '/performance-management/monthly',
  telemarketingController.getMonthlyPerformance
);
telemarketingRouter.get(
  '/performance-management/daily',
  telemarketingController.getDailyPerformance
);
telemarketingRouter.get(
  '/performance-management/team-monthly',
  telemarketingController.getTeamMonthlyPerformance
);
telemarketingRouter.get(
  '/performance-management/team-daily',
  telemarketingController.getTeamDailyPerformance
);
telemarketingRouter.get(
  '/all-customers',
  telemarketingController.getAllCustomers
);
telemarketingRouter.get(
  '/new-customers',
  telemarketingController.getNewCustomers
);
telemarketingRouter.post(
  '/new-customers/import',
  upload.single('file'),
  telemarketingController.postImportCustomers(CustomerType.NEW)
);
telemarketingRouter.get(
  '/old-customers',
  telemarketingController.getOldCustomers
);
telemarketingRouter.get(
  '/telemarketers',
  telemarketingController.getTelemarketers
);
telemarketingRouter.post(
  '/old-customers/import',
  upload.single('file'),
  telemarketingController.postImportCustomers(CustomerType.OLD)
);
telemarketingRouter.get(
  '/registered-customers',
  telemarketingController.getRegisteredCustomers
);
telemarketingRouter.post(
  '/registered-customers/import',
  upload.single('file'),
  telemarketingController.postImportCustomers(CustomerType.REGISTERED)
);
telemarketingRouter.post(
  '/kyc-validation',
  telemarketingController.postKycValidation
);
telemarketingRouter.post(
  '/borrow-validation',
  telemarketingController.postBorrowValidation
);
telemarketingRouter.post(
  '/borrow-cancellation',
  telemarketingController.postBorrowCancellation
);
telemarketingRouter.post(
  '/manual-assignment',
  telemarketingController.postManualAssignment
);
telemarketingRouter.post('/release', telemarketingController.postRelease);

export { telemarketingRouter };
