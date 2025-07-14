// config.ts
export const config = {
  supabaseUrl: process.env.SUPABASE_URL as string,
  supabaseKey: process.env.SUPABASE_KEY as string,
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
};
