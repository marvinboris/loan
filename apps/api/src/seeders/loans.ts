import { supabase } from '../lib/supabase';
import { CreateLoanInput } from '../types';

export async function seedLoans() {
  console.log('🌱 Seeding Loans...');

  // Récupération des 5 premiers clients
  const { data: customers, error: customersError } = await supabase
    .from('customers')
    .select('id')
    .range(0, 4);

  if (customersError || !customers || customers.length < 5) {
    console.error('Error fetching customers:', customersError);
    return;
  }

  const loansData: CreateLoanInput[] = [
    {
      loan_number: 'LN001',
      loan_order_number: 'ORD001',
      product_name: 'Personal Loan',
      customer_id: customers[0].id,
      loan_amount: 500000,
      loan_tenure: 12,
      loan_type: 'Personal',
      due_date: '2024-12-15',
      app_status: 'Approved',
      app_channel: 'Mobile',
      app_version: '1.0.0',
      app_name: 'LoanApp',
      collector_id: 4,
      collection_stage: 'Early',
      days_overdue: 0,
      total_repayment: 550000,
      amount_repaid: 100000,
      tag: 'Good Customer',
      repeated_borrowing: false,
      loan_status: 'Active',
    },
    {
      loan_number: 'LN002',
      loan_order_number: 'ORD002',
      product_name: 'Business Loan',
      customer_id: customers[1].id,
      loan_amount: 1000000,
      loan_tenure: 24,
      loan_type: 'Business',
      due_date: '2024-11-10',
      app_status: 'Approved',
      app_channel: 'Web',
      app_version: '1.0.0',
      app_name: 'LoanApp',
      collector_id: 5,
      collection_stage: 'Mid',
      days_overdue: 15,
      total_repayment: 1200000,
      amount_repaid: 200000,
      tag: 'Overdue',
      repeated_borrowing: true,
      loan_status: 'Overdue',
    },
    {
      loan_number: 'LN003',
      loan_order_number: 'ORD003',
      product_name: 'Emergency Loan',
      customer_id: customers[2].id,
      loan_amount: 250000,
      loan_tenure: 6,
      loan_type: 'Emergency',
      due_date: '2024-10-20',
      app_status: 'Approved',
      app_channel: 'Mobile',
      app_version: '1.0.0',
      app_name: 'LoanApp',
      collector_id: 4,
      collection_stage: 'Late',
      days_overdue: 30,
      total_repayment: 275000,
      amount_repaid: 50000,
      tag: 'High Risk',
      repeated_borrowing: false,
      loan_status: 'Overdue',
    },
    {
      loan_number: 'LN004',
      loan_order_number: 'ORD004',
      product_name: 'Personal Loan',
      customer_id: customers[3].id,
      loan_amount: 750000,
      loan_tenure: 18,
      loan_type: 'Personal',
      due_date: '2025-02-01',
      app_status: 'Approved',
      app_channel: 'Mobile',
      app_version: '1.0.0',
      app_name: 'LoanApp',
      collector_id: 5,
      collection_stage: 'Early',
      days_overdue: 0,
      total_repayment: 825000,
      amount_repaid: 150000,
      tag: 'Regular Customer',
      repeated_borrowing: false,
      loan_status: 'Active',
    },
    {
      loan_number: 'LN005',
      loan_order_number: 'ORD005',
      product_name: 'Business Loan',
      customer_id: customers[4].id,
      loan_amount: 2000000,
      loan_tenure: 36,
      loan_type: 'Business',
      due_date: '2025-01-20',
      app_status: 'Approved',
      app_channel: 'Web',
      app_version: '1.0.0',
      app_name: 'LoanApp',
      collector_id: 4,
      collection_stage: 'Early',
      days_overdue: 0,
      total_repayment: 2400000,
      amount_repaid: 400000,
      tag: 'VIP Customer',
      repeated_borrowing: true,
      loan_status: 'Active',
    },
  ];

  // Insertion batch des prêts
  const { error } = await supabase.from('loans').upsert(loansData, {
    onConflict: 'loan_number', // Clé de conflit pour l'upsert
    ignoreDuplicates: false,
  });

  if (error) {
    console.error('Error seeding loans:', error);
  } else {
    console.log('✅ Loans seeded successfully');
  }
}
