import { CollectionRecord } from './collectionRecord';
import { Customer } from './customer';
import { Loan } from './loan';
import { Performance } from './performance';
import { Repayment } from './repayment';
import { User } from './user';

// User relations
User.hasMany(Customer, {
  foreignKey: 'telemarketerId',
  as: 'telemarketingCustomers',
});
User.hasMany(Loan, { foreignKey: 'collectorId', as: 'collectedLoans' });
User.hasMany(Repayment, {
  foreignKey: 'collectorId',
  as: 'collectedRepayments',
});
User.hasMany(Performance, { foreignKey: 'userId', as: 'performances' });
User.hasMany(CollectionRecord, {
  foreignKey: 'collectorId',
  as: 'collectionRecords',
});

// Customer relations
Customer.belongsTo(User, { foreignKey: 'telemarketerId', as: 'telemarketer' });
Customer.hasMany(Loan, { foreignKey: 'customerId', as: 'loans' });

// Loan relations
Loan.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });
Loan.belongsTo(User, { foreignKey: 'collectorId', as: 'collector' });
Loan.hasMany(Repayment, { foreignKey: 'loanId', as: 'repayments' });
Loan.hasMany(CollectionRecord, {
  foreignKey: 'loanId',
  as: 'collectionRecords',
});

// Repayment relations
Repayment.belongsTo(Loan, { foreignKey: 'loanId', as: 'loan' });
Repayment.belongsTo(User, { foreignKey: 'collectorId', as: 'collector' });

// Performance relations
Performance.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// CollectionRecord relations
CollectionRecord.belongsTo(Loan, { foreignKey: 'loanId', as: 'loan' });
CollectionRecord.belongsTo(User, {
  foreignKey: 'collectorId',
  as: 'collector',
});
