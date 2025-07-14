// database/seeders/index.ts
import { seedCollectionRecords } from './collectionRecords';
import { seedCustomers } from './customers';
import { seedLoans } from './loans';
import { seedPerformances } from './performances';
import { seedRepayments } from './repayments';
import { seedUsers } from './users';

export async function seedAll() {
  console.log('🚀 Starting database seeding...');

  try {
    await seedUsers();
    await seedCustomers();
    await seedLoans();
    await seedCollectionRecords();
    await seedPerformances();
    await seedRepayments();

    console.log('🎉 All data seeded successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
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
    }
  };

  runSeeder();
}
