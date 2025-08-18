import express from 'express';
import { pixpayRouter } from './pixpay';

const testRouter = express.Router();

testRouter.use('/pixpay', pixpayRouter);

export { testRouter };
