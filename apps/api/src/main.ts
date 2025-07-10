import express from 'express';
import { authRouter } from './routes';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 4300;

const app = express();

app.use('/api/auth', authRouter);

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
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
