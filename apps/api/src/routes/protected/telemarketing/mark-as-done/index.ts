import express from 'express';
import { MarkAsDoneController } from './controller';

const markAsDoneRouter = express.Router();

const markAsDoneController = new MarkAsDoneController();

markAsDoneRouter.post('/', markAsDoneController.post);

export { markAsDoneRouter };
