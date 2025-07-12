import cors from 'cors';
import express, { json } from 'express';
import { sequelize } from './database/models';
import { syncDatabase } from './database/sync';
import {
  authRouter,
  collectionRouter,
  financialRouter,
  operationRouter,
  telemarketingRouter,
} from './routes';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 4300;

// Initialiser la DB
syncDatabase().then(() => {
  const app = express();

  // Option 1: Allow all origins (for development or specific scenarios)
  app.use(
    cors({
      origin: '*',
    })
  );

  app.use(json());

  // Database connection
  sequelize
    .authenticate()
    .then(() => {
      console.log(`[ DB ] Connected`);
      return sequelize.sync({ alter: true }); // Use force: true only in development to drop tables
    })
    .then(() => {
      console.log('[ DB ] Synced');
    })
    .catch((err) => {
      console.error('[ DB ] Connection error:', err);
    });

  app.use('/api/auth', authRouter);
  app.use('/api/telemarketing', telemarketingRouter);
  app.use('/api/financial', financialRouter);
  app.use('/api/collection', collectionRouter);
  app.use('/api/operation', operationRouter);

  app.get('/', (req, res) => {
    res.send({ message: 'Hello API' });
  });

  // Error handling middleware
  app.use(
    (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      console.error(err.stack);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  );

  app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
  });
});
