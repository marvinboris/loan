import express from 'express';
import { FinishedController } from './controller';

const finishedRouter = express.Router();

const finishedController = new FinishedController();

finishedRouter.get('/', finishedController.get);

export { finishedRouter };
