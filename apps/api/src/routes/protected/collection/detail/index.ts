import express from 'express';
import { DetailController } from './controller';

const detailRouter = express.Router();

const detailController = new DetailController();

detailRouter.get('/:id', detailController.get);
detailRouter.post('/:id/mark', detailController.mark);

export { detailRouter };
