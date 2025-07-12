import {
  ConnectionStatus,
  WillingnessToPay,
  CollectionRecord,
  User,
  UserRole,
  Loan,
} from '../models';

// Collection Record Seeder
export async function seedCollectionRecords() {
  console.log('🌱 Seeding Collection Records...');

  const loan1 = await Loan.findOne();
  const loan2 = await Loan.findOne({ offset: 1 });
  const loan3 = await Loan.findOne({ offset: 2 });
  const loan4 = await Loan.findOne({ offset: 3 });
  const loan5 = await Loan.findOne({ offset: 4 });
  const collector1 = await User.findOne({
    where: {
      role: UserRole.COLLECTOR,
    },
  });
  const collector2 = await User.findOne({
    where: {
      role: UserRole.COLLECTOR,
    },
    offset: 1,
  });

  const collectionRecords = [
    {
      loanId: loan1.get('id'),
      collectorId: collector1.get('id'),
      mark: 'First Contact',
      recordContent: 'Customer contacted regarding loan repayment',
      contact: '+237650123456',
      targetContact: '+237650123456',
      connection: ConnectionStatus.CONNECTED,
      willingnessToPay: WillingnessToPay.HIGH,
      overdueReason: 'Temporary financial difficulty',
      result: 'Promised to pay by end of week',
      recordTime: new Date('2024-02-01 10:00:00'),
    },
    {
      loanId: loan2.get('id'),
      collectorId: collector2.get('id'),
      mark: 'Follow-up Call',
      recordContent: 'Second attempt to contact customer',
      contact: '+237651234567',
      targetContact: '+237651234567',
      connection: ConnectionStatus.NO_ANSWER,
      willingnessToPay: WillingnessToPay.MEDIUM,
      overdueReason: 'Business cash flow issues',
      result: 'Left voicemail',
      recordTime: new Date('2024-02-02 14:30:00'),
    },
    {
      loanId: loan3.get('id'),
      collectorId: collector1.get('id'),
      mark: 'Urgent Follow-up',
      recordContent: 'Customer is significantly overdue',
      contact: '+237652345678',
      targetContact: '+237652345678',
      connection: ConnectionStatus.CONNECTED,
      willingnessToPay: WillingnessToPay.LOW,
      overdueReason: 'Lost job',
      result: 'Negotiated payment plan',
      recordTime: new Date('2024-02-03 09:15:00'),
    },
    {
      loanId: loan4.get('id'),
      collectorId: collector2.get('id'),
      mark: 'Regular Check-in',
      recordContent: 'Routine call to ensure payment on track',
      contact: '+237653456789',
      targetContact: '+237653456789',
      connection: ConnectionStatus.CONNECTED,
      willingnessToPay: WillingnessToPay.HIGH,
      overdueReason: 'No issues reported',
      result: 'Payment confirmed for next week',
      recordTime: new Date('2024-02-04 11:45:00'),
    },
    {
      loanId: loan5.get('id'),
      collectorId: collector1.get('id'),
      mark: 'VIP Customer Contact',
      recordContent: 'Contact with premium customer',
      contact: '+237654567890',
      targetContact: '+237654567890',
      connection: ConnectionStatus.CONNECTED,
      willingnessToPay: WillingnessToPay.HIGH,
      overdueReason: 'Administrative delay',
      result: 'Payment processed immediately',
      recordTime: new Date('2024-02-05 16:20:00'),
    },
  ];

  for (const recordData of collectionRecords) {
    await CollectionRecord.create(recordData);
  }

  console.log('✅ Collection Records seeded successfully');
}
