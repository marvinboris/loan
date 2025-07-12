import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connection';
import { Loan } from './loan';
import { User } from './user';

export enum ConnectionStatus {
  CONNECTED = 'connected',
  NO_ANSWER = 'no_answer',
  WRONG_NUMBER = 'wrong_number',
}

export enum WillingnessToPay {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  REFUSAL = 'refusal',
}

interface CollectionRecordAttributes {
  id: number;
  loanId: number;
  collectorId: number;
  mark: string;
  recordContent: string;
  contact: string;
  targetContact: string;
  connection: ConnectionStatus;
  willingnessToPay: WillingnessToPay;
  overdueReason: string;
  result: string;
  recordTime: Date;
}

interface CollectionRecordAssociations {
  collector?: User;
  loan?: Loan;
}

export class CollectionRecord
  extends Model<CollectionRecordAttributes>
  implements CollectionRecordAttributes, CollectionRecordAssociations
{
  public id!: number;
  public loanId!: number;
  public collectorId!: number;
  public mark!: string;
  public recordContent!: string;
  public contact!: string;
  public targetContact!: string;
  public connection!: ConnectionStatus;
  public willingnessToPay!: WillingnessToPay;
  public overdueReason!: string;
  public result!: string;
  public recordTime!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  declare collector?: User;
  declare loan?: Loan;
}

CollectionRecord.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    collectorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      field: 'collector_id',
    },
    mark: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    recordContent: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'record_content',
    },
    contact: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    targetContact: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'target_contact',
    },
    connection: {
      type: DataTypes.ENUM(...Object.values(ConnectionStatus)),
      allowNull: false,
    },
    willingnessToPay: {
      type: DataTypes.ENUM(...Object.values(WillingnessToPay)),
      allowNull: false,
      field: 'willingness_to_pay',
    },
    overdueReason: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'overdue_reason',
    },
    result: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    recordTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'record_time',
    },
  },
  {
    sequelize,
    tableName: 'collection_records',
    timestamps: true,
  }
);
