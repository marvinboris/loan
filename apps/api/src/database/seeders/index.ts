import { Sequelize } from 'sequelize';
import { config } from '../../config';
import { seedCollectionRecords } from './collectionRecords';
import { seedCustomers } from './customers';
import { seedLoans } from './loans';
import { seedPerformances } from './performances';
import { seedRepayments } from './repayments';
import { seedUsers } from './users';

// Initialize database connection
const sequelize = new Sequelize(config.databaseUrl);

// Helper function to get random element from array
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Helper function to get random date within range
function getRandomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// Master Seeder - Calls all seeders in correct order
export async function seedAll() {
  console.log('🚀 Starting database seeding...');

  try {
    // Connect to database
    await sequelize.authenticate();
    console.log('✅ Database connection established');

    // Sync database (create tables if they don't exist)
    await sequelize.sync({ force: false });
    console.log('✅ Database synchronized');

    // Seed data in correct order (respecting foreign key constraints)
    await seedUsers(); // First - no dependencies
    await seedCustomers(); // Second - references users (telemarketerId)
    await seedLoans(); // Third - references customers and users (collectors)
    await seedCollectionRecords(); // Fourth - references loans and users (collectors)
    await seedPerformances(); // Fifth - references users
    await seedRepayments(); // Sixth - references loans and users (collectors)

    console.log('🎉 All data seeded successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  } finally {
    await sequelize.close();
    console.log('✅ Database connection closed');
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: npm run seed [seeder_name]');
    console.log('Available seeders:');
    console.log('  - users');
    console.log('  - customers');
    console.log('  - loans');
    console.log('  - collection-records');
    console.log('  - performances');
    console.log('  - repayments');
    console.log('  - all (runs all seeders)');
    process.exit(1);
  }

  const seederName = args[0];

  const runSeeder = async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ force: false });

      switch (seederName) {
        case 'users':
          await seedUsers();
          break;
        case 'customers':
          await seedCustomers();
          break;
        case 'loans':
          await seedLoans();
          break;
        case 'collection-records':
          await seedCollectionRecords();
          break;
        case 'performances':
          await seedPerformances();
          break;
        case 'repayments':
          await seedRepayments();
          break;
        case 'all':
          await seedAll();
          break;
        default:
          console.log(`❌ Unknown seeder: ${seederName}`);
          process.exit(1);
      }
    } catch (error) {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    } finally {
      await sequelize.close();
    }
  };

  runSeeder();
}
