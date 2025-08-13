// database/seeders/users.ts
import { CreateUserInput, UserRole, UserStatus } from '../types';
import bcrypt from 'bcryptjs';
import { supabase } from '../lib';

export async function seedUsers() {
  console.log('🌱 Seeding Users...');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', salt);

  const users: CreateUserInput[] = [
    {
      email: 'admin@creditwave.com',
      account: 'admin',
      password: hashedPassword,
      name: 'Admin User',
      work_number: 'ADM000',
      role: UserRole.ADMIN,
      group: 'Management',
      entry_date: new Date('2023-01-01').toISOString(),
      weights: 100,
      voice_collection: true,
      staff_level: 'Senior',
      status: UserStatus.ACTIVE,
      reset_password_token: null,
      reset_password_expires: null,
    },
    {
      email: 'telemarketer1@creditwave.com',
      account: 'telemarketer1',
      password: hashedPassword,
      name: 'John Telemarketer',
      work_number: 'TEL001',
      role: UserRole.TELEMARKETER,
      group: 'Sales Team A',
      entry_date: new Date('2023-02-15').toISOString(),
      weights: 80,
      voice_collection: true,
      staff_level: 'Mid',
      status: UserStatus.ACTIVE,
      reset_password_token: null,
      reset_password_expires: null,
    },
    {
      email: 'telemarketer2@creditwave.com',
      account: 'telemarketer2',
      password: hashedPassword,
      name: 'Jane Telemarketer',
      work_number: 'TEL002',
      role: UserRole.TELEMARKETER,
      group: 'Sales Team B',
      entry_date: new Date('2023-03-01').toISOString(),
      weights: 75,
      voice_collection: true,
      staff_level: 'Junior',
      status: UserStatus.ACTIVE,
      reset_password_token: null,
      reset_password_expires: null,
    },
    {
      email: 'collector1@creditwave.com',
      account: 'collector1',
      password: hashedPassword,
      name: 'Mike Collector',
      work_number: 'COL001',
      role: UserRole.COLLECTOR,
      group: 'Collection Team A',
      entry_date: new Date('2023-01-15').toISOString(),
      weights: 90,
      voice_collection: true,
      staff_level: 'Senior',
      status: UserStatus.ACTIVE,
      reset_password_token: null,
      reset_password_expires: null,
    },
    {
      email: 'collector2@creditwave.com',
      account: 'collector2',
      password: hashedPassword,
      name: 'Sarah Collector',
      work_number: 'COL002',
      role: UserRole.COLLECTOR,
      group: 'Collection Team B',
      entry_date: new Date('2023-02-01').toISOString(),
      weights: 85,
      voice_collection: true,
      staff_level: 'Mid',
      status: UserStatus.ACTIVE,
      reset_password_token: null,
      reset_password_expires: null,
    },
  ];

  const { data, error } = await supabase.from('users').insert(users);

  if (error) {
    console.error('Error seeding users:', error);
    return;
  }

  console.log('✅ Users seeded successfully');
}
