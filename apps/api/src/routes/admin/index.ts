import express from 'express';
import { collectionRouter } from './collection';
import { financialRouter } from './financial';
import { operationRouter } from './operation';
import { telemarketingRouter } from './telemarketing';

const adminRouter = express.Router();

adminRouter.use('/telemarketing', telemarketingRouter);
adminRouter.use('/financial', financialRouter);
adminRouter.use('/collection', collectionRouter);
adminRouter.use('/operation', operationRouter);

export { adminRouter };
