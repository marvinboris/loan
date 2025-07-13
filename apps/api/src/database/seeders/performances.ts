import { Performance, PerformanceType, User, UserRole } from '../models';

// Performance Seeder
export async function seedPerformances() {
  console.log('🌱 Seeding Performances...');

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

  const performances = [
    {
      userId: telemarketer1.get('id'),
      groupName: 'Sales Team A',
      type: PerformanceType.TELEMARKETER_MONTHLY,
      date: new Date('2024-01-31'),
      dateRange: 'January 2024',
      ranking: 2,
      totalAssignedQty: 80,
      newAssignedNum: 15,
      targetRepayRate: 78.0,
      targetNum: 62,
      numOfApps: 95,
      appRate: 82.1,
      numOfApprovedApps: 78,
      handleNum: 65,
      bonus: 35000,
      status: 'Completed',
      daysOfEmployment: 330,
      numOfCalls: 320,
      numOfConnections: 250,
      phoneConnectionRate: 78.1,
      totalCallDuration: 1200,
      firstCallTime: new Date('2024-01-01 08:30:00'),
      latestCallTime: new Date('2024-01-31 17:00:00'),
      caseCoverage: 81.2,
      numOfSms: 120,
    },
    {
      userId: telemarketer2.get('id'),
      groupName: 'Sales Team B',
      type: PerformanceType.TELEMARKETER_MONTHLY,
      date: new Date('2024-01-31'),
      dateRange: 'January 2024',
      ranking: 3,
      totalAssignedQty: 75,
      newAssignedNum: 12,
      targetRepayRate: 72.0,
      targetNum: 54,
      numOfApps: 88,
      appRate: 79.5,
      numOfApprovedApps: 70,
      handleNum: 58,
      bonus: 28000,
      status: 'Completed',
      daysOfEmployment: 315,
      numOfCalls: 280,
      numOfConnections: 210,
      phoneConnectionRate: 75.0,
      totalCallDuration: 1000,
      firstCallTime: new Date('2024-01-01 09:00:00'),
      latestCallTime: new Date('2024-01-31 16:45:00'),
      caseCoverage: 77.3,
      numOfSms: 100,
    },
    {
      userId: collector1.get('id'),
      groupName: 'Collection Team A',
      type: PerformanceType.TEAM_MONTHLY,
      date: new Date('2024-01-31'),
      dateRange: 'January 2024',
      ranking: 1,
      totalAssignedQty: 60,
      newAssignedNum: 8,
      targetRepayRate: 88.0,
      targetNum: 53,
      numOfApps: 0,
      appRate: 0,
      numOfApprovedApps: 0,
      handleNum: 55,
      bonus: 45000,
      status: 'Completed',
      daysOfEmployment: 380,
      numOfCalls: 420,
      numOfConnections: 350,
      phoneConnectionRate: 83.3,
      totalCallDuration: 2100,
      firstCallTime: new Date('2024-01-01 08:15:00'),
      latestCallTime: new Date('2024-01-31 18:00:00'),
      caseCoverage: 91.7,
      numOfSms: 80,
    },
    {
      userId: collector2.get('id'),
      groupName: 'Collection Team B',
      type: PerformanceType.TEAM_MONTHLY,
      date: new Date('2024-01-31'),
      dateRange: 'January 2024',
      ranking: 2,
      totalAssignedQty: 55,
      newAssignedNum: 7,
      targetRepayRate: 82.0,
      targetNum: 45,
      numOfApps: 0,
      appRate: 0,
      numOfApprovedApps: 0,
      handleNum: 48,
      bonus: 38000,
      status: 'Completed',
      daysOfEmployment: 345,
      numOfCalls: 380,
      numOfConnections: 310,
      phoneConnectionRate: 81.6,
      totalCallDuration: 1900,
      firstCallTime: new Date('2024-01-01 08:45:00'),
      latestCallTime: new Date('2024-01-31 17:45:00'),
      caseCoverage: 87.3,
      numOfSms: 70,
    },
  ];

  for (const performanceData of performances) {
    await Performance.create(performanceData).catch((err) => {
      console.log(err);
    });
  }

  console.log('✅ Performances seeded successfully');
}
