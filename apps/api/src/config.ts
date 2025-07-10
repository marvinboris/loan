export const config = {
  databaseUrl:
    process.env.DATABASE_URL ||
    'postgres://user:password@localhost:5432/dbname',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:4200',
};
