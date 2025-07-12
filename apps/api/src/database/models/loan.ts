import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connection';
import { Customer } from './customer';
import { User } from './user';
import { CollectionRecord } from './collectionRecord';
import { Repayment } from './repayment';

interface LoanAttributes {
  id: number;
  loanNumber: string;
  loanOrderNumber: string;
  productName: string;
  customerId: number;
  loanAmount: number;
  loanTenure: number;
  loanType: string;
  dueDate: Date;
  appStatus: string;
  appChannel: string;
  appVersion: string;
  appName: string;
  collectorId?: number;
  collectionStage?: string;
  daysOverdue?: number;
  totalRepayment?: number;
  amountRepaid?: number;
  tag?: string;
  repeatedBorrowing: boolean;
  loanStatus: string;
}

interface LoanAssociations {
  customer?: Customer;
  collector?: User;
  collectionRecords?: CollectionRecord[];
  repayments?: Repayment[];
}

export class Loan
  extends Model<LoanAttributes>
  implements LoanAttributes, LoanAssociations
{
  public id!: number;
  public loanNumber!: string;
  public loanOrderNumber!: string;
  public productName!: string;
  public customerId!: number;
  public loanAmount!: number;
  public loanTenure!: number;
  public loanType!: string;
  public dueDate!: Date;
  public appStatus!: string;
  public appChannel!: string;
  public appVersion!: string;
  public appName!: string;
  public collectorId?: number;
  public collectionStage?: string;
  public daysOverdue?: number;
  public totalRepayment?: number;
  public amountRepaid?: number;
  public tag?: string;
  public repeatedBorrowing!: boolean;
  public loanStatus!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  declare customer?: Customer;
  declare collector?: User;
  declare collectionRecords?: CollectionRecord[];
  declare repayments?: Repayment[];
}

Loan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    loanNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      field: 'loan_number',
    },
    loanOrderNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'loan_order_number',
    },
    productName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'product_name',
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'id',
      },
      field: 'customer_id',
    },
    loanAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      field: 'loan_amount',
    },
    loanTenure: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'loan_tenure',
    },
    loanType: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'loan_type',
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'due_date',
    },
    appStatus: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'app_status',
    },
    appChannel: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'app_channel',
    },
    appVersion: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'app_version',
    },
    appName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'app_name',
    },
    collectorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      field: 'collector_id',
    },
    collectionStage: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'collection_stage',
    },
    daysOverdue: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'days_overdue',
    },
    totalRepayment: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      field: 'total_repayment',
    },
    amountRepaid: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      field: 'amount_repaid',
    },
    tag: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    repeatedBorrowing: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'repeated_borrowing',
    },
    loanStatus: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'loan_status',
    },
  },
  {
    sequelize,
    tableName: 'loans',
    timestamps: true,
  }
);
