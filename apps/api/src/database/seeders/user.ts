import bcrypt from 'bcryptjs';
import { Sequelize } from 'sequelize';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { config } from '../../config';
import { User, UserRole, UserStatus } from '../models';

async function seedUser(
  email: string,
  password: string,
  name: string,
  workNumber: string,
  role: UserRole
) {
  const sequelize = new Sequelize(config.databaseUrl);

  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log(`User with email ${email} already exists.`);
      return;
    }

    const existingWorkNumber = await User.findOne({ where: { workNumber } });
    if (existingWorkNumber) {
      console.log(`User with work number ${workNumber} already exists.`);
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      workNumber,
      role,
      voiceCollection: false, // Default value
      status: UserStatus.ACTIVE, // Default value
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });

    console.log('User created successfully:', {
      id: user.id,
      email: user.email,
      name: user.name,
      workNumber: user.workNumber,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error('Error seeding user:', error);
  } finally {
    await sequelize.close();
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

// Enhanced seedUser function with all optional parameters
async function seedUserWithAllOptions(
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
  const sequelize = new Sequelize(config.databaseUrl);

  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log(`User with email ${email} already exists.`);
      return;
    }

    const existingWorkNumber = await User.findOne({ where: { workNumber } });
    if (existingWorkNumber) {
      console.log(`User with work number ${workNumber} already exists.`);
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData: any = {
      email,
      password: hashedPassword,
      name,
      workNumber,
      role,
      voiceCollection: options.voiceCollection ?? false,
      status: 'active',
      resetPasswordToken: null,
      resetPasswordExpires: null,
    };

    // Add optional fields if provided
    if (options.group) userData.group = options.group;
    if (options.entryDate) userData.entryDate = new Date(options.entryDate);
    if (options.weights !== undefined) userData.weights = options.weights;
    if (options.staffLevel) userData.staffLevel = options.staffLevel;

    const user = await User.create(userData);

    console.log('User created successfully:', {
      id: user.get('id'),
      email: user.get('email'),
      name: user.get('name'),
      workNumber: user.get('workNumber'),
      role: user.get('role'),
      group: user.get('group'),
      entryDate: user.get('entryDate'),
      weights: user.get('weights'),
      voiceCollection: user.get('voiceCollection'),
      staffLevel: user.get('staffLevel'),
      status: user.get('status'),
      createdAt: user.get('createdAt'),
    });
  } catch (error) {
    console.error('Error seeding user:', error);
  } finally {
    await sequelize.close();
  }
}

// Exécution avec les arguments CLI
seedUserWithAllOptions(
  argv.email,
  argv.password,
  argv.name,
  argv.workNumber,
  argv.role as UserRole,
  {
    group: argv.group,
    entryDate: argv.entryDate,
    weights: argv.weights,
    voiceCollection: argv.voiceCollection,
    staffLevel: argv.staffLevel,
  }
);
