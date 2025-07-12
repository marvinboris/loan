import { sequelize } from '../connection';

// Importer tous les modèles
import {
  CollectionRecord,
  ConnectionStatus,
  WillingnessToPay,
} from './collectionRecord';
import { Customer, CustomerType } from './customer';
import { Loan } from './loan';
import { Performance, PerformanceType } from './performance';
import { Repayment, TradingStatus } from './repayment';
import { User, UserRole, UserStatus } from './user';

// Importer les relations (ceci doit être fait après l'import des modèles)
import './relations';

export {
  sequelize,
  CollectionRecord,
  ConnectionStatus,
  WillingnessToPay,
  Customer,
  CustomerType,
  Loan,
  Performance,
  PerformanceType,
  Repayment,
  TradingStatus,
  User,
  UserRole,
  UserStatus,
};
