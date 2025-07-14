// config.ts
export const config = {
  databaseUrl: 'mysql://user:password@localhost:3306/dbname',
  supabaseUrl:
    process.env.SUPABASE_URL || 'https://zfeulbfxwgpcleimtozs.supabase.co',
  supabaseKey:
    process.env.SUPABASE_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmZXVsYmZ4d2dwY2xlaW10b3pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2MzU4NjIsImV4cCI6MjA2MjIxMTg2Mn0.znPCofWGp6vgjHNUFJIB_JB73SQURgF2sZznb2E_-Es',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
};
