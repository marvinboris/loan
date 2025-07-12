import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connection';
import { Loan } from './loan';

export enum TradingStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

interface RepaymentAttributes {
  id: number;
  repaymentNumber: string;
  loanId: number;
  repaymentAmount: number;
  realAmount?: number;
  tradingStatus: TradingStatus;
  repaymentCodeVaLink?: string;
  paymentChannel?: string;
  creationTime: Date;
  paybackTime?: Date;
  paymentCompanySerialNumber?: string;
  collectorId?: number;
  latestFollowUpTime?: Date;
  followUpResults?: string;
  descFollowUp?: string;
  whetherAssigned: boolean;
}

interface RepaymentAssociations {
  loan?: Loan;
}

export class Repayment
  extends Model<RepaymentAttributes>
  implements RepaymentAttributes, RepaymentAssociations
{
  public id!: number;
  public repaymentNumber!: string;
  public loanId!: number;
  public repaymentAmount!: number;
  public realAmount?: number;
  public tradingStatus!: TradingStatus;
  public repaymentCodeVaLink?: string;
  public paymentChannel?: string;
  public creationTime!: Date;
  public paybackTime?: Date;
  public paymentCompanySerialNumber?: string;
  public collectorId?: number;
  public latestFollowUpTime?: Date;
  public followUpResults?: string;
  public descFollowUp?: string;
  public whetherAssigned!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  declare loan?: Loan;
}

Repayment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    repaymentNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      field: 'repayment_number',
    },
    loanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'loans',
        key: 'id',
      },
      field: 'loan_id',
    },
    repaymentAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      field: 'repayment_amount',
    },
    realAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      field: 'real_amount',
    },
    tradingStatus: {
      type: DataTypes.ENUM(...Object.values(TradingStatus)),
      allowNull: false,
      field: 'trading_status',
    },
    repaymentCodeVaLink: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'repayment_code_va_link',
    },
    paymentChannel: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'payment_channel',
    },
    creationTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'creation_time',
    },
    paybackTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'payback_time',
    },
    paymentCompanySerialNumber: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'payment_company_serial_number',
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
    latestFollowUpTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'latest_follow_up_time',
    },
    followUpResults: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'follow_up_results',
    },
    descFollowUp: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'desc_follow_up',
    },
    whetherAssigned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'whether_assigned',
    },
  },
  {
    sequelize,
    tableName: 'repayments',
    timestamps: true,
  }
);
