import { Customer, Loan } from '../models';

// Loan Seeder
export async function seedLoans() {
  console.log('🌱 Seeding Loans...');

  const customer1 = await Customer.findOne();
  const customer2 = await Customer.findOne({
    offset: 1,
  });
  const customer3 = await Customer.findOne({
    offset: 2,
  });
  const customer4 = await Customer.findOne({
    offset: 3,
  });
  const customer5 = await Customer.findOne({
    offset: 4,
  });

  const loans = [
    {
      loanNumber: 'LN001',
      loanOrderNumber: 'ORD001',
      productName: 'Personal Loan',
      customerId: customer1.get('id'),
      loanAmount: 500000,
      loanTenure: 12,
      loanType: 'Personal',
      dueDate: new Date('2024-12-15'),
      appStatus: 'Approved',
      appChannel: 'Mobile',
      appVersion: '1.0.0',
      appName: 'LoanApp',
      collectorId: 4,
      collectionStage: 'Early',
      daysOverdue: 0,
      totalRepayment: 550000,
      amountRepaid: 100000,
      tag: 'Good Customer',
      repeatedBorrowing: false,
      loanStatus: 'Active',
    },
    {
      loanNumber: 'LN002',
      loanOrderNumber: 'ORD002',
      productName: 'Business Loan',
      customerId: customer2.get('id'),
      loanAmount: 1000000,
      loanTenure: 24,
      loanType: 'Business',
      dueDate: new Date('2024-11-10'),
      appStatus: 'Approved',
      appChannel: 'Web',
      appVersion: '1.0.0',
      appName: 'LoanApp',
      collectorId: 5,
      collectionStage: 'Mid',
      daysOverdue: 15,
      totalRepayment: 1200000,
      amountRepaid: 200000,
      tag: 'Overdue',
      repeatedBorrowing: true,
      loanStatus: 'Overdue',
    },
    {
      loanNumber: 'LN003',
      loanOrderNumber: 'ORD003',
      productName: 'Emergency Loan',
      customerId: customer3.get('id'),
      loanAmount: 250000,
      loanTenure: 6,
      loanType: 'Emergency',
      dueDate: new Date('2024-10-20'),
      appStatus: 'Approved',
      appChannel: 'Mobile',
      appVersion: '1.0.0',
      appName: 'LoanApp',
      collectorId: 4,
      collectionStage: 'Late',
      daysOverdue: 30,
      totalRepayment: 275000,
      amountRepaid: 50000,
      tag: 'High Risk',
      repeatedBorrowing: false,
      loanStatus: 'Overdue',
    },
    {
      loanNumber: 'LN004',
      loanOrderNumber: 'ORD004',
      productName: 'Personal Loan',
      customerId: customer4.get('id'),
      loanAmount: 750000,
      loanTenure: 18,
      loanType: 'Personal',
      dueDate: new Date('2025-02-01'),
      appStatus: 'Approved',
      appChannel: 'Mobile',
      appVersion: '1.0.0',
      appName: 'LoanApp',
      collectorId: 5,
      collectionStage: 'Early',
      daysOverdue: 0,
      totalRepayment: 825000,
      amountRepaid: 150000,
      tag: 'Regular Customer',
      repeatedBorrowing: false,
      loanStatus: 'Active',
    },
    {
      loanNumber: 'LN005',
      loanOrderNumber: 'ORD005',
      productName: 'Business Loan',
      customerId: customer5.get('id'),
      loanAmount: 2000000,
      loanTenure: 36,
      loanType: 'Business',
      dueDate: new Date('2025-01-20'),
      appStatus: 'Approved',
      appChannel: 'Web',
      appVersion: '1.0.0',
      appName: 'LoanApp',
      collectorId: 4,
      collectionStage: 'Early',
      daysOverdue: 0,
      totalRepayment: 2400000,
      amountRepaid: 400000,
      tag: 'VIP Customer',
      repeatedBorrowing: true,
      loanStatus: 'Active',
    },
  ];

  for (const loanData of loans) {
    await Loan.findOrCreate({
      where: { loanNumber: loanData.loanNumber },
      defaults: loanData,
    });
  }

  console.log('✅ Loans seeded successfully');
}
