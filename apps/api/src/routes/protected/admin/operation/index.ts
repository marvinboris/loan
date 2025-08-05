import express from 'express';
import { OperationController } from './controller';

const operationRouter = express.Router();

const operationController = new OperationController();

// Operation routes
operationRouter.get('/account', operationController.getAccounts);
operationRouter.post('/account', operationController.createAccount);

export { operationRouter };
