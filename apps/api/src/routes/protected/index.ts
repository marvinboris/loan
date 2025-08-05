import express from 'express';
import { authenticate, authorize } from '../../middlewares';
import { adminRouter } from './admin';
import { telemarketingRouter } from './telemarketing';
import { customerRouter } from './customer';
import { collectionRouter } from './collection';

const protectedRouter = express.Router();

protectedRouter.use(authenticate);

protectedRouter.use('/admin', authorize('admin'), adminRouter);
protectedRouter.use('/collection', authorize('collector'), collectionRouter);
protectedRouter.use('/customer', authorize('customer'), customerRouter);
protectedRouter.use(
  '/telemarketing',
  authorize('telemarketer'),
  telemarketingRouter
);

export { protectedRouter };
