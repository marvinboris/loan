import { CustomerType, Customer, User, UserRole } from '../models';

// Customer Seeder
export async function seedCustomers() {
  console.log('🌱 Seeding Customers...');

  const telemarketer1 = await User.findOne({
    where: {
      role: UserRole.TELEMARKETER,
    },
  });
  const telemarketer2 = await User.findOne({
    where: {
      role: UserRole.TELEMARKETER,
    },
    offset: 1,
  });

  const customers = [
    {
      mobile: '+237650123456',
      name: 'Alice Johnson',
      type: CustomerType.NEW,
      userLabel: 'Premium Customer',
      district: 'Douala I',
      appName: 'LoanApp',
      followUpPerson: 'John Telemarketer',
      whetherApply: true,
      appTime: new Date('2024-01-15'),
      allocationTime: new Date('2024-01-16'),
      latestFollowUpTime: new Date('2024-01-20'),
      followUpResults: 'Interested',
      descFollowUp: 'Customer showed interest in loan product',
      whetherAssigned: true,
      prevRepaymentTime: null,
      telemarketerId: telemarketer1.get('id'),
    },
    {
      mobile: '+237651234567',
      name: 'Bob Smith',
      type: CustomerType.OLD,
      userLabel: 'Regular Customer',
      district: 'Douala II',
      appName: 'LoanApp',
      followUpPerson: 'Jane Telemarketer',
      whetherApply: true,
      appTime: new Date('2024-01-10'),
      allocationTime: new Date('2024-01-11'),
      latestFollowUpTime: new Date('2024-01-25'),
      followUpResults: 'Applied',
      descFollowUp: 'Customer completed loan application',
      whetherAssigned: true,
      prevRepaymentTime: new Date('2023-12-15'),
      telemarketerId: telemarketer2.get('id'),
    },
    {
      mobile: '+237652345678',
      name: 'Carol Williams',
      type: CustomerType.REGISTERED,
      userLabel: 'VIP Customer',
      district: 'Douala III',
      appName: 'LoanApp',
      followUpPerson: 'John Telemarketer',
      whetherApply: false,
      appTime: null,
      allocationTime: new Date('2024-01-05'),
      latestFollowUpTime: new Date('2024-01-30'),
      followUpResults: 'Not Interested',
      descFollowUp: 'Customer declined loan offer',
      whetherAssigned: true,
      prevRepaymentTime: new Date('2023-11-20'),
      telemarketerId: telemarketer1.get('id'),
    },
    {
      mobile: '+237653456789',
      name: 'David Brown',
      type: CustomerType.NEW,
      userLabel: null,
      district: 'Douala IV',
      appName: 'LoanApp',
      followUpPerson: 'Jane Telemarketer',
      whetherApply: true,
      appTime: new Date('2024-02-01'),
      allocationTime: new Date('2024-02-02'),
      latestFollowUpTime: new Date('2024-02-05'),
      followUpResults: 'Pending',
      descFollowUp: 'Waiting for documentation',
      whetherAssigned: true,
      prevRepaymentTime: null,
      telemarketerId: telemarketer2.get('id'),
    },
    {
      mobile: '+237654567890',
      name: 'Eva Davis',
      type: CustomerType.OLD,
      userLabel: 'Gold Customer',
      district: 'Douala V',
      appName: 'LoanApp',
      followUpPerson: 'John Telemarketer',
      whetherApply: true,
      appTime: new Date('2024-01-20'),
      allocationTime: new Date('2024-01-21'),
      latestFollowUpTime: new Date('2024-02-10'),
      followUpResults: 'Approved',
      descFollowUp: 'Loan approved and disbursed',
      whetherAssigned: true,
      prevRepaymentTime: new Date('2023-10-15'),
      telemarketerId: telemarketer1.get('id'),
    },
  ];

  for (const customerData of customers) {
    await Customer.findOrCreate({
      where: { mobile: customerData.mobile },
      defaults: customerData,
    });
  }

  console.log('✅ Customers seeded successfully');
}
