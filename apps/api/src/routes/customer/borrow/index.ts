import express from 'express';
import { submitValidator } from './validators';
import { BorrowController } from './controller';

const borrowRouter = express.Router();

const borrowController = new BorrowController();

borrowRouter.post('/', submitValidator, borrowController.submit);

export { borrowRouter };
