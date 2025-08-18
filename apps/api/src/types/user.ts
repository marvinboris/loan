// src/types/user.ts
export enum UserRole {
  ADMIN = 'admin',
  TELEMARKETER = 'telemarketer',
  COLLECTOR = 'collector',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface User {
  id: number;
  email: string;
  account: string;
  password: string;
  name: string;
  work_number: string;
  role: UserRole;
  group_id?: number | null;
  entry_date?: string | null; // ISO string format
  weights?: number | null;
  voice_collection: boolean;
  staff_level?: string | null;
  status: UserStatus;
  reset_password_token?: string | null;
  reset_password_expires?: string | null; // ISO string format
  collection_distribution_rules?: string | null;
  rules_approving_distribution?: string | null;
  last_login_ip?: string | null;
  created_at: string; // Automatically set by Supabase
  updated_at: string; // Automatically set by Supabase
}

// Type pour la création d'un utilisateur (exclut les champs auto-générés)
export type CreateUserInput = Omit<User, 'id' | 'created_at' | 'updated_at'>;

// Type pour la mise à jour d'un utilisateur
export type UpdateUserInput = Partial<
  Omit<User, 'id' | 'created_at' | 'email' | 'work_number'>
>;

// Type pour la réponse publique (exclut les champs sensibles)
export type PublicUser = Omit<
  User,
  'password' | 'reset_password_token' | 'reset_password_expires'
>;
