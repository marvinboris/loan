import bcrypt from 'bcryptjs';
import { UserRole, UserStatus, User } from '../models';

// User Seeder
export async function seedUsers() {
  console.log('🌱 Seeding Users...');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', salt);

  const users = [
    {
      email: 'admin@creditwave.com',
      password: hashedPassword,
      name: 'Admin User',
      workNumber: 'ADM000',
      role: UserRole.ADMIN,
      group: 'Management',
      entryDate: new Date('2023-01-01'),
      weights: 100,
      voiceCollection: true,
      staffLevel: 'Senior',
      status: UserStatus.ACTIVE,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
    {
      email: 'telemarketer1@creditwave.com',
      password: hashedPassword,
      name: 'John Telemarketer',
      workNumber: 'TEL001',
      role: UserRole.TELEMARKETER,
      group: 'Sales Team A',
      entryDate: new Date('2023-02-15'),
      weights: 80,
      voiceCollection: true,
      staffLevel: 'Mid',
      status: UserStatus.ACTIVE,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
    {
      email: 'telemarketer2@creditwave.com',
      password: hashedPassword,
      name: 'Jane Telemarketer',
      workNumber: 'TEL002',
      role: UserRole.TELEMARKETER,
      group: 'Sales Team B',
      entryDate: new Date('2023-03-01'),
      weights: 75,
      voiceCollection: true,
      staffLevel: 'Junior',
      status: UserStatus.ACTIVE,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
    {
      email: 'collector1@creditwave.com',
      password: hashedPassword,
      name: 'Mike Collector',
      workNumber: 'COL001',
      role: UserRole.COLLECTOR,
      group: 'Collection Team A',
      entryDate: new Date('2023-01-15'),
      weights: 90,
      voiceCollection: true,
      staffLevel: 'Senior',
      status: UserStatus.ACTIVE,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
    {
      email: 'collector2@creditwave.com',
      password: hashedPassword,
      name: 'Sarah Collector',
      workNumber: 'COL002',
      role: UserRole.COLLECTOR,
      group: 'Collection Team B',
      entryDate: new Date('2023-02-01'),
      weights: 85,
      voiceCollection: true,
      staffLevel: 'Mid',
      status: UserStatus.ACTIVE,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
  ];

  for (const userData of users) {
    await User.findOrCreate({
      where: { email: userData.email },
      defaults: userData,
    });
  }

  console.log('✅ Users seeded successfully');
}
