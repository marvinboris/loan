import { CreateRepaymentInput, TradingStatus } from '../types';
import { supabase } from '../lib';

export async function seedRepayments() {
  console.log('🌱 Seeding Repayments...');

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

  const repayments: CreateRepaymentInput[] = [
    {
      repayment_number: 'REP001',
      loan_id: loans[0].id,
      repayment_amount: 50000,
      real_amount: 50000,
      trading_status: TradingStatus.SUCCESS,
      repayment_code_va_link: 'https://payment.com/rep001',
      payment_channel: 'Mobile Money',
      creation_time: '2024-01-15T10:00:00Z',
      payback_time: '2024-01-15T10:05:00Z',
      payment_company_serial_number: 'PAY001',
      collector_id: 4,
      latest_follow_up_time: '2024-01-16T09:00:00Z',
      follow_up_results: 'Payment confirmed',
      desc_follow_up: 'Customer paid on time',
      whether_assigned: true,
    },
    {
      repayment_number: 'REP002',
      loan_id: loans[0].id,
      repayment_amount: 50000,
      real_amount: 50000,
      trading_status: TradingStatus.SUCCESS,
      repayment_code_va_link: 'https://payment.com/rep002',
      payment_channel: 'Bank Transfer',
      creation_time: '2024-02-15T14:30:00Z',
      payback_time: '2024-02-15T14:32:00Z',
      payment_company_serial_number: 'PAY002',
      collector_id: 4,
      latest_follow_up_time: '2024-02-16T08:30:00Z',
      follow_up_results: 'Payment confirmed',
      desc_follow_up: 'Second payment received',
      whether_assigned: true,
    },
    {
      repayment_number: 'REP003',
      loan_id: loans[1].id,
      repayment_amount: 100000,
      real_amount: 100000,
      trading_status: TradingStatus.SUCCESS,
      repayment_code_va_link: 'https://payment.com/rep003',
      payment_channel: 'Mobile Money',
      creation_time: '2024-01-10T11:00:00Z',
      payback_time: '2024-01-10T11:03:00Z',
      payment_company_serial_number: 'PAY003',
      collector_id: 5,
      latest_follow_up_time: '2024-01-11T10:00:00Z',
      follow_up_results: 'Payment confirmed',
      desc_follow_up: 'Initial payment for business loan',
      whether_assigned: true,
    },
    {
      repayment_number: 'REP004',
      loan_id: loans[1].id,
      repayment_amount: 100000,
      real_amount: 100000,
      trading_status: TradingStatus.SUCCESS,
      repayment_code_va_link: 'https://payment.com/rep004',
      payment_channel: 'Bank Transfer',
      creation_time: '2024-02-10T15:00:00Z',
      payback_time: '2024-02-10T15:05:00Z',
      payment_company_serial_number: 'PAY004',
      collector_id: 5,
      latest_follow_up_time: '2024-02-11T09:30:00Z',
      follow_up_results: 'Payment confirmed',
      desc_follow_up: 'Second payment for business loan',
      whether_assigned: true,
    },
    {
      repayment_number: 'REP005',
      loan_id: loans[2].id,
      repayment_amount: 50000,
      real_amount: 50000,
      trading_status: TradingStatus.SUCCESS,
      repayment_code_va_link: 'https://payment.com/rep005',
      payment_channel: 'Mobile Money',
      creation_time: '2024-01-20T12:00:00Z',
      payback_time: '2024-01-20T12:02:00Z',
      payment_company_serial_number: 'PAY005',
      collector_id: 4,
      latest_follow_up_time: '2024-01-21T08:00:00Z',
      follow_up_results: 'Payment confirmed',
      desc_follow_up: 'Partial payment for emergency loan',
      whether_assigned: true,
    },
    {
      repayment_number: 'REP006',
      loan_id: loans[3].id,
      repayment_amount: 75000,
      real_amount: 75000,
      trading_status: TradingStatus.PENDING,
      repayment_code_va_link: 'https://payment.com/rep006',
      payment_channel: 'Bank Transfer',
      creation_time: '2024-02-01T16:00:00Z',
      payback_time: null, // Pas de date pour paiement en attente
      payment_company_serial_number: 'PAY006',
      collector_id: 5,
      latest_follow_up_time: '2024-02-05T10:00:00Z',
      follow_up_results: 'Payment pending',
      desc_follow_up: 'Customer initiated payment, awaiting confirmation',
      whether_assigned: true,
    },
    {
      repayment_number: 'REP007',
      loan_id: loans[3].id,
      repayment_amount: 75000,
      real_amount: 75000,
      trading_status: TradingStatus.SUCCESS,
      repayment_code_va_link: 'https://payment.com/rep007',
      payment_channel: 'Mobile Money',
      creation_time: '2024-02-15T13:00:00Z',
      payback_time: '2024-02-15T13:03:00Z',
      payment_company_serial_number: 'PAY007',
      collector_id: 5,
      latest_follow_up_time: '2024-02-16T09:00:00Z',
      follow_up_results: 'Payment confirmed',
      desc_follow_up: 'Second payment received',
      whether_assigned: true,
    },
    {
      repayment_number: 'REP008',
      loan_id: loans[4].id,
      repayment_amount: 200000,
      real_amount: 200000,
      trading_status: TradingStatus.SUCCESS,
      repayment_code_va_link: 'https://payment.com/rep008',
      payment_channel: 'Bank Transfer',
      creation_time: '2024-01-20T10:00:00Z',
      payback_time: '2024-01-20T10:01:00Z',
      payment_company_serial_number: 'PAY008',
      collector_id: 4,
      latest_follow_up_time: '2024-01-21T08:00:00Z',
      follow_up_results: 'Payment confirmed',
      desc_follow_up: 'Large payment from VIP customer',
      whether_assigned: true,
    },
    {
      repayment_number: 'REP009',
      loan_id: loans[4].id,
      repayment_amount: 200000,
      real_amount: 200000,
      trading_status: TradingStatus.SUCCESS,
      repayment_code_va_link: 'https://payment.com/rep009',
      payment_channel: 'Bank Transfer',
      creation_time: '2024-02-20T11:00:00Z',
      payback_time: '2024-02-20T11:02:00Z',
      payment_company_serial_number: 'PAY009',
      collector_id: 4,
      latest_follow_up_time: '2024-02-21T09:00:00Z',
      follow_up_results: 'Payment confirmed',
      desc_follow_up: 'Second large payment from VIP customer',
      whether_assigned: true,
    },
  ];

  // Insertion avec gestion des conflits
  const { error } = await supabase.from('repayments').upsert(repayments, {
    onConflict: 'repayment_number', // Clé unique pour détecter les conflits
    ignoreDuplicates: false,
  });

  if (error) {
    console.error('Error seeding repayments:', error);
  } else {
    console.log('✅ Repayments seeded successfully');
  }
}
