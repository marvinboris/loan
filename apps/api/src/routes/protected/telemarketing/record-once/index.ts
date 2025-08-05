import express from 'express';
import { RecordOnceController } from './controller';

const recordOnceRouter = express.Router();

const recordOnceController = new RecordOnceController();

recordOnceRouter.post('/', recordOnceController.post);

export { recordOnceRouter };
