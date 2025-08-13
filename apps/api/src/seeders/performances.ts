import { CreatePerformanceInput, PerformanceType } from '@creditwave/types';
import { supabase } from '../lib';

export async function seedPerformances() {
  console.log('🌱 Seeding Performances...');

  // Récupération des télémarketeurs
  const { data: telemarketers, error: telemarketersError } = await supabase
    .from('users')
    .select('id')
    .eq('role', 'telemarketer')
    .order('id', { ascending: true })
    .range(0, 1);

  if (telemarketersError || !telemarketers || telemarketers.length < 2) {
    console.error('Error fetching telemarketers:', telemarketersError);
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

  const performances: CreatePerformanceInput[] = [
    {
      user_id: telemarketers[0].id,
      group_name: 'Sales Team A',
      type: PerformanceType.TELEMARKETER_MONTHLY,
      date: '2024-01-31',
      date_range: 'January 2024',
      ranking: 2,
      total_assigned_qty: 80,
      new_assigned_num: 15,
      target_repay_rate: 78.0,
      target_num: 62,
      num_of_apps: 95,
      app_rate: 82.1,
      num_of_approved_apps: 78,
      handle_num: 65,
      bonus: 35000,
      status: 'Completed',
      days_of_employment: 330,
      num_of_calls: 320,
      num_of_connections: 250,
      phone_connection_rate: 78.1,
      total_call_duration: 1200,
      first_call_time: '2024-01-01T08:30:00Z',
      latest_call_time: '2024-01-31T17:00:00Z',
      case_coverage: 81.2,
      num_of_sms: 120,
    },
    {
      user_id: telemarketers[1].id,
      group_name: 'Sales Team B',
      type: PerformanceType.TELEMARKETER_MONTHLY,
      date: '2024-01-31',
      date_range: 'January 2024',
      ranking: 3,
      total_assigned_qty: 75,
      new_assigned_num: 12,
      target_repay_rate: 72.0,
      target_num: 54,
      num_of_apps: 88,
      app_rate: 79.5,
      num_of_approved_apps: 70,
      handle_num: 58,
      bonus: 28000,
      status: 'Completed',
      days_of_employment: 315,
      num_of_calls: 280,
      num_of_connections: 210,
      phone_connection_rate: 75.0,
      total_call_duration: 1000,
      first_call_time: '2024-01-01T09:00:00Z',
      latest_call_time: '2024-01-31T16:45:00Z',
      case_coverage: 77.3,
      num_of_sms: 100,
    },
    {
      user_id: collectors[0].id,
      group_name: 'Collection Team A',
      type: PerformanceType.TEAM_MONTHLY,
      date: '2024-01-31',
      date_range: 'January 2024',
      ranking: 1,
      total_assigned_qty: 60,
      new_assigned_num: 8,
      target_repay_rate: 88.0,
      target_num: 53,
      num_of_apps: 0,
      app_rate: 0,
      num_of_approved_apps: 0,
      handle_num: 55,
      bonus: 45000,
      status: 'Completed',
      days_of_employment: 380,
      num_of_calls: 420,
      num_of_connections: 350,
      phone_connection_rate: 83.3,
      total_call_duration: 2100,
      first_call_time: '2024-01-01T08:15:00Z',
      latest_call_time: '2024-01-31T18:00:00Z',
      case_coverage: 91.7,
      num_of_sms: 80,
    },
    {
      user_id: collectors[1].id,
      group_name: 'Collection Team B',
      type: PerformanceType.TEAM_MONTHLY,
      date: '2024-01-31',
      date_range: 'January 2024',
      ranking: 2,
      total_assigned_qty: 55,
      new_assigned_num: 7,
      target_repay_rate: 82.0,
      target_num: 45,
      num_of_apps: 0,
      app_rate: 0,
      num_of_approved_apps: 0,
      handle_num: 48,
      bonus: 38000,
      status: 'Completed',
      days_of_employment: 345,
      num_of_calls: 380,
      num_of_connections: 310,
      phone_connection_rate: 81.6,
      total_call_duration: 1900,
      first_call_time: '2024-01-01T08:45:00Z',
      latest_call_time: '2024-01-31T17:45:00Z',
      case_coverage: 87.3,
      num_of_sms: 70,
    },
  ];

  // Insertion des performances
  const { error } = await supabase.from('performances').insert(performances);

  if (error) {
    console.error('Error seeding performances:', error);
  } else {
    console.log('✅ Performances seeded successfully');
  }
}
