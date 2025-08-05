// database/seeders/customers.ts
import { supabase } from '../lib';
import { CreateCustomerInput, CustomerType } from '../types/customer';

export async function seedCustomers() {
  console.log('🌱 Seeding Customers...');

  try {
    // Récupérer les télémarketeurs existants
    const { data: telemarketers, error: telemarketersError } = await supabase
      .from('users')
      .select('id')
      .eq('role', 'telemarketer')
      .order('created_at', { ascending: true });

    if (telemarketersError || !telemarketers || telemarketers.length < 2) {
      throw new Error('Not enough telemarketers found. Seed users first.');
    }

    const telemarketer1 = telemarketers[0];
    const telemarketer2 = telemarketers[1];

    const customers: CreateCustomerInput[] = [
      {
        mobile: '+237650123456',
        name: 'Alice Johnson',
        type: CustomerType.NEW,
        user_label: 'Premium Customer',
        district: 'Douala I',
        app_name: 'LoanApp',
        follow_up_person: 'John Telemarketer',
        whether_apply: true,
        app_time: new Date('2024-01-15').toISOString(),
        allocation_time: new Date('2024-01-16').toISOString(),
        latest_follow_up_time: new Date('2024-01-20').toISOString(),
        follow_up_results: 'Interested',
        desc_follow_up: 'Customer showed interest in loan product',
        whether_assigned: true,
        prev_repayment_time: null,
        telemarketer_id: telemarketer1.id,
      },
      {
        mobile: '+237651234567',
        name: 'Bob Smith',
        type: CustomerType.OLD,
        user_label: 'Regular Customer',
        district: 'Douala II',
        app_name: 'LoanApp',
        follow_up_person: 'Jane Telemarketer',
        whether_apply: true,
        app_time: new Date('2024-01-10').toISOString(),
        allocation_time: new Date('2024-01-11').toISOString(),
        latest_follow_up_time: new Date('2024-01-25').toISOString(),
        follow_up_results: 'Applied',
        desc_follow_up: 'Customer completed loan application',
        whether_assigned: true,
        prev_repayment_time: new Date('2023-12-15').toISOString(),
        telemarketer_id: telemarketer2.id,
      },
      {
        mobile: '+237652345678',
        name: 'Carol Williams',
        type: CustomerType.REGISTERED,
        user_label: 'VIP Customer',
        district: 'Douala III',
        app_name: 'LoanApp',
        follow_up_person: 'John Telemarketer',
        whether_apply: false,
        app_time: null,
        allocation_time: new Date('2024-01-05').toISOString(),
        latest_follow_up_time: new Date('2024-01-30').toISOString(),
        follow_up_results: 'Not Interested',
        desc_follow_up: 'Customer declined loan offer',
        whether_assigned: true,
        prev_repayment_time: new Date('2023-11-20').toISOString(),
        telemarketer_id: telemarketer1.id,
      },
      {
        mobile: '+237653456789',
        name: 'David Brown',
        type: CustomerType.NEW,
        user_label: null,
        district: 'Douala IV',
        app_name: 'LoanApp',
        follow_up_person: 'Jane Telemarketer',
        whether_apply: true,
        app_time: new Date('2024-02-01').toISOString(),
        allocation_time: new Date('2024-02-02').toISOString(),
        latest_follow_up_time: new Date('2024-02-05').toISOString(),
        follow_up_results: 'Pending',
        desc_follow_up: 'Waiting for documentation',
        whether_assigned: true,
        prev_repayment_time: null,
        telemarketer_id: telemarketer2.id,
      },
      {
        mobile: '+237654567890',
        name: 'Eva Davis',
        type: CustomerType.OLD,
        user_label: 'Gold Customer',
        district: 'Douala V',
        app_name: 'LoanApp',
        follow_up_person: 'John Telemarketer',
        whether_apply: true,
        app_time: new Date('2024-01-20').toISOString(),
        allocation_time: new Date('2024-01-21').toISOString(),
        latest_follow_up_time: new Date('2024-02-10').toISOString(),
        follow_up_results: 'Approved',
        desc_follow_up: 'Loan approved and disbursed',
        whether_assigned: true,
        prev_repayment_time: new Date('2023-10-15').toISOString(),
        telemarketer_id: telemarketer1.id,
      },
    ];

    // Vérifier et insérer les clients
    for (const customerData of customers) {
      const { data: existing } = await supabase
        .from('customers')
        .select('id')
        .eq('mobile', customerData.mobile)
        .single();

      if (existing) {
        console.log(
          `Customer with mobile ${customerData.mobile} already exists. Skipping...`
        );
        continue;
      }

      await supabase.from('customers').insert(customerData).throwOnError();
    }

    console.log('✅ Customers seeded successfully');
  } catch (error) {
    console.error(
      'Error seeding customers:',
      error instanceof Error ? error.message : error
    );
    throw error;
  }
}

// Fonction CLI pour lancer ce seeder spécifique
if (require.main === module) {
  seedCustomers().catch((error) => {
    console.error('Customer Seeder Error:', error);
    process.exit(1);
  });
}
