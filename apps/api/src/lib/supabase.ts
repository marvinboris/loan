// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { config } from '../config';
import { Database } from '../types/database';

export const supabase = createClient<Database>(
  config.supabaseUrl,
  config.supabaseKey
);
