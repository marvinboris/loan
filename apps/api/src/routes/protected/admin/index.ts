import express from 'express';
import { cbordRouter } from './cbord';
import { collectionRouter } from './collection';
import { financialRouter } from './financial';
import { operationRouter } from './operation';
import { telemarketingRouter } from './telemarketing';
import { validationRouter } from './validation';

const adminRouter = express.Router();

adminRouter.use('/telemarketing', telemarketingRouter);
adminRouter.use('/financial', financialRouter);
adminRouter.use('/collection', collectionRouter);
adminRouter.use('/operation', operationRouter);
adminRouter.use('/validation', validationRouter);
adminRouter.use('/cbord', cbordRouter);

export { adminRouter };
