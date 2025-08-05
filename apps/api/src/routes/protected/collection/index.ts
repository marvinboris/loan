import express from 'express';
import { dashboardRouter } from './dashboard';
import { finishedRouter } from './finished';
import { detailRouter } from './detail';
import { myPerformanceRouter } from './my-performance';

const collectionRouter = express.Router();

collectionRouter.use('/dashboard', dashboardRouter);
collectionRouter.use('/finished', finishedRouter);
collectionRouter.use('/my-performance', myPerformanceRouter);
collectionRouter.use('/:id', detailRouter);

export { collectionRouter };
