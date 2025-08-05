import express from 'express';
import { DetailController } from './controller';

const detailRouter = express.Router();

const detailController = new DetailController();

detailRouter.get('/', detailController.get);
detailRouter.post('/mark', detailController.mark);

export { detailRouter };
