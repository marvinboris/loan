import express from 'express';
import { OperationController } from './controller';

const operationRouter = express.Router();

const operationController = new OperationController();

// Operation routes
operationRouter.get('/account', operationController.getAccounts);
operationRouter.post('/account', operationController.createAccount);
operationRouter.put('/account/:id', operationController.editAccount);
operationRouter.delete('/account/:id', operationController.deleteAccount);
operationRouter.get('/groups', operationController.getGroupsOptions);
operationRouter.get('/group', operationController.getGroups);
operationRouter.post('/group', operationController.createGroup);
operationRouter.put('/group/:id', operationController.editGroup);
operationRouter.delete('/group/:id', operationController.deleteGroup);

export { operationRouter };
