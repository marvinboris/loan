import express from 'express';
import { dashboardRouter } from './dashboard';
import { finishedRouter } from './finished';
import { detailRouter } from './detail';
import { myPerformanceRouter } from './my-performance';

const collectionRouter = express.Router();

collectionRouter.use('/dashboard', dashboardRouter);
collectionRouter.use('/:id', detailRouter);
collectionRouter.use('/finished', finishedRouter);
collectionRouter.use('/my-performance', myPerformanceRouter);

export { collectionRouter };
