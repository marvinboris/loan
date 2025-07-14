// database/seeders/user.ts
import bcrypt from 'bcryptjs';
import { config } from '../config';
import { supabase } from '../lib/supabase';
import { UserRole, UserStatus } from '../types/user';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

/**
 * Fonction pour créer un seul utilisateur via CLI
 */
export async function seedUserWithAllOptions(
  email: string,
  password: string,
  name: string,
  workNumber: string,
  role: UserRole,
  options: {
    group?: string;
    entryDate?: string;
    weights?: number;
    voiceCollection?: boolean;
    staffLevel?: string;
  } = {}
) {
  try {
    // Vérifier si l'utilisateur existe déjà
    const { data: existingEmail } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingEmail) {
      console.log(`User with email ${email} already exists.`);
      return;
    }

    const { data: existingWorkNumber } = await supabase
      .from('users')
      .select('id')
      .eq('work_number', workNumber)
      .single();

    if (existingWorkNumber) {
      console.log(`User with work number ${workNumber} already exists.`);
      return;
    }

    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Préparer les données utilisateur
    const userData: any = {
      email,
      password: hashedPassword,
      name,
      work_number: workNumber,
      role,
      voice_collection: options.voiceCollection ?? false,
      status: UserStatus.ACTIVE,
      reset_password_token: null,
      reset_password_expires: null,
    };

    // Ajouter les champs optionnels
    if (options.group) userData.group = options.group;
    if (options.entryDate)
      userData.entry_date = new Date(options.entryDate).toISOString();
    if (options.weights !== undefined) userData.weights = options.weights;
    if (options.staffLevel) userData.staff_level = options.staffLevel;

    // Créer l'utilisateur
    const { data: user, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single();

    if (error) throw error;

    console.log('User created successfully:', {
      id: user.id,
      email: user.email,
      name: user.name,
      workNumber: user.work_number,
      role: user.role,
      group: user.group,
      entryDate: user.entry_date,
      weights: user.weights,
      voiceCollection: user.voice_collection,
      staffLevel: user.staff_level,
      status: user.status,
      createdAt: user.created_at,
    });
  } catch (error) {
    console.error(
      'Error seeding user:',
      error instanceof Error ? error.message : error
    );
  }
}

// Configuration des arguments CLI
const argv = yargs(hideBin(process.argv))
  .option('email', {
    type: 'string',
    description: 'Email of the user to create',
    demandOption: true,
  })
  .option('password', {
    type: 'string',
    description: 'Password for the user',
    demandOption: true,
  })
  .option('name', {
    type: 'string',
    description: 'Name of the user',
    demandOption: true,
  })
  .option('workNumber', {
    type: 'string',
    description: 'Work number of the user (must be unique)',
    demandOption: true,
  })
  .option('role', {
    type: 'string',
    description: 'Role of the user',
    choices: Object.values(UserRole),
    demandOption: true,
  })
  .option('group', {
    type: 'string',
    description: 'Group of the user',
    demandOption: false,
  })
  .option('entryDate', {
    type: 'string',
    description: 'Entry date of the user (YYYY-MM-DD)',
    demandOption: false,
  })
  .option('weights', {
    type: 'number',
    description: 'Weights for the user',
    demandOption: false,
  })
  .option('voiceCollection', {
    type: 'boolean',
    description: 'Voice collection enabled',
    default: false,
  })
  .option('staffLevel', {
    type: 'string',
    description: 'Staff level of the user',
    demandOption: false,
  })
  .parseSync();
