import express from 'express';
import { ApplicationsController } from './controller';

const applicationsRouter = express.Router();

const applicationsController = new ApplicationsController();

applicationsRouter.get('/', applicationsController.get);

export { applicationsRouter };
