import express from 'express';
import { RepayController } from './controller';
import { submitValidator } from './validators';

const repayRouter = express.Router();

const repayController = new RepayController();

repayRouter.post('/', submitValidator, repayController.submit);

export { repayRouter };
