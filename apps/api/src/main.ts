// main.ts
import express from 'express';
import cors from 'cors';
import { config } from './config';
import { authRouter, protectedRouter } from './routes';

const app = express();
const port = process.env.PORT || 4300;

app.use(cors({ origin: '*' }));
app.use(express.json());

// Servir les fichiers statiques (images uploadées)
app.use('/uploads', express.static(config.uploadsPath));

// Routes
app.use('/api/auth', authRouter);
app.use('/api', protectedRouter);

// Test endpoint
app.get('/', (req, res) => {
  res.send({ message: 'Credit Wave API' });
});

// Error handling
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

// Start server
app.listen(port, () => {
  console.log(`[ready] Server running on port ${port}`);

  // Optionnel: Exécuter les seeders au démarrage
  if (process.env.RUN_SEEDERS === 'true') {
    import('./seeders').then((module) => {
      module.seedAll().then(() => console.log('Database seeded successfully'));
    });
  }
});
