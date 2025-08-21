import express from 'express';
import { CbordController } from './controller';

const cbordRouter = express.Router();

const cbordController = new CbordController();

// Cbord routes
cbordRouter.get('/marketing', cbordController.getMarketing);
cbordRouter.get('/collection', cbordController.getCollection);

export { cbordRouter };
