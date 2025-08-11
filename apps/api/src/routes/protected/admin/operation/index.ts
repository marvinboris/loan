import express from 'express';
import { OperationController } from './controller';

const operationRouter = express.Router();

const operationController = new OperationController();

// Operation routes
operationRouter.get('/account', operationController.getAccounts);
operationRouter.post('/account', operationController.createAccount);
operationRouter.put('/account/:id', operationController.editAccount);
operationRouter.delete('/account/:id', operationController.deleteAccount);

export { operationRouter };
