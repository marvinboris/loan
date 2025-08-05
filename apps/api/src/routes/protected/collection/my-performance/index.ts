import express from 'express';
import { MyPerformanceController } from './controller';

const myPerformanceRouter = express.Router();

const myPerformanceController = new MyPerformanceController();

myPerformanceRouter.get('/', myPerformanceController.get);

export { myPerformanceRouter };
