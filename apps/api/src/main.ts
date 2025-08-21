// main.ts
import express from 'express';
import cors from 'cors';
import { config } from './config';
import { authRouter, protectedRouter, testRouter } from './routes';
import { cleanCustomers, cleanLoans } from './scripts';
import { seedAll } from './seeders';

process.env.TZ = 'UTC';

const app = express();
const port = process.env.PORT || 4300;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques (images uploadées)
app.use('/uploads', express.static(config.uploadsPath));

// Routes
app.use('/api/auth', authRouter);
// app.use('/api/test', testRouter);
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
    console.error('Detailed error:', err);
    console.error('Stack:', err.stack);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
);

process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);

// Start server
app.listen(port, () => {
  console.log(`[ready] Server running on port ${port}`);

  // Optionnel: Exécuter les seeders au démarrage
  if (process.env.RUN_SEEDERS === 'true') {
    seedAll().then(() => console.log('Database seeded successfully'));
  }

  // Optionnel: Nettoyer les clients au démarrage
  if (process.env.CLEAN_CUSTOMERS === 'true') {
    cleanCustomers().then(() => console.log('Customers cleaned successfully'));
  }

  // Optionnel: Nettoyer les demandes d'emprunt au démarrage
  if (process.env.CLEAN_LOANS === 'true') {
    cleanLoans().then(() => console.log('Loans cleaned successfully'));
  }
});
