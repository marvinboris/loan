import { supabase } from '../lib/supabase';
import {
  ConnectionStatus,
  CreateCollectionRecordInput,
  WillingnessToPay,
} from '../types';

export async function seedCollectionRecords() {
  console.log('🌱 Seeding Collection Records...');

  // Récupération des prêts
  const { data: loans, error: loansError } = await supabase
    .from('loans')
    .select('id')
    .order('id', { ascending: true })
    .range(0, 4);

  if (loansError || !loans || loans.length < 5) {
    console.error('Error fetching loans:', loansError);
    return;
  }

  // Récupération des collecteurs
  const { data: collectors, error: collectorsError } = await supabase
    .from('users')
    .select('id')
    .eq('role', 'collector')
    .order('id', { ascending: true })
    .range(0, 1);

  if (collectorsError || !collectors || collectors.length < 2) {
    console.error('Error fetching collectors:', collectorsError);
    return;
  }

  const collectionRecords: CreateCollectionRecordInput[] = [
    {
      loan_id: loans[0].id,
      collector_id: collectors[0].id,
      mark: 'First Contact',
      record_content: 'Customer contacted regarding loan repayment',
      contact: '+237650123456',
      target_contact: '+237650123456',
      connection: ConnectionStatus.CONNECTED,
      willingness_to_pay: WillingnessToPay.HIGH,
      overdue_reason: 'Temporary financial difficulty',
      result: 'Promised to pay by end of week',
      record_time: '2024-02-01T10:00:00Z',
    },
    {
      loan_id: loans[1].id,
      collector_id: collectors[1].id,
      mark: 'Follow-up Call',
      record_content: 'Second attempt to contact customer',
      contact: '+237651234567',
      target_contact: '+237651234567',
      connection: ConnectionStatus.NO_ANSWER,
      willingness_to_pay: WillingnessToPay.MEDIUM,
      overdue_reason: 'Business cash flow issues',
      result: 'Left voicemail',
      record_time: '2024-02-02T14:30:00Z',
    },
    {
      loan_id: loans[2].id,
      collector_id: collectors[0].id,
      mark: 'Urgent Follow-up',
      record_content: 'Customer is significantly overdue',
      contact: '+237652345678',
      target_contact: '+237652345678',
      connection: ConnectionStatus.CONNECTED,
      willingness_to_pay: WillingnessToPay.LOW,
      overdue_reason: 'Lost job',
      result: 'Negotiated payment plan',
      record_time: '2024-02-03T09:15:00Z',
    },
    {
      loan_id: loans[3].id,
      collector_id: collectors[1].id,
      mark: 'Regular Check-in',
      record_content: 'Routine call to ensure payment on track',
      contact: '+237653456789',
      target_contact: '+237653456789',
      connection: ConnectionStatus.CONNECTED,
      willingness_to_pay: WillingnessToPay.HIGH,
      overdue_reason: 'No issues reported',
      result: 'Payment confirmed for next week',
      record_time: '2024-02-04T11:45:00Z',
    },
    {
      loan_id: loans[4].id,
      collector_id: collectors[0].id,
      mark: 'VIP Customer Contact',
      record_content: 'Contact with premium customer',
      contact: '+237654567890',
      target_contact: '+237654567890',
      connection: ConnectionStatus.CONNECTED,
      willingness_to_pay: WillingnessToPay.HIGH,
      overdue_reason: 'Administrative delay',
      result: 'Payment processed immediately',
      record_time: '2024-02-05T16:20:00Z',
    },
  ];

  // Insertion des enregistrements
  const { error } = await supabase
    .from('collection_records')
    .insert(collectionRecords);

  if (error) {
    console.error('Error seeding collection records:', error);
  } else {
    console.log('✅ Collection Records seeded successfully');
  }
}
