import bcrypt from 'bcryptjs';
import { Sequelize } from 'sequelize';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { User } from '../models';
import { config } from '../config';

async function seedUser(email: string, password: string) {
  const sequelize = new Sequelize(config.databaseUrl);

  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log(`User with email ${email} already exists.`);
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    console.log('User created successfully:', {
      id: user.id,
      email: user.email,
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
  .parseSync();

// Exécution avec les arguments CLI
seedUser(argv.email, argv.password);
