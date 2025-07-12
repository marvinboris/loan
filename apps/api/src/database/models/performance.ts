import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connection';
import { User } from './user';

export enum PerformanceType {
  TELEMARKETER_DAILY = 'telemarketer_daily',
  TELEMARKETER_MONTHLY = 'telemarketer_monthly',
  TEAM_DAILY = 'team_daily',
  TEAM_MONTHLY = 'team_monthly',
  COLLECTOR_DAILY = 'collector_daily',
  COLLECTOR_MONTHLY = 'collector_monthly',
}

interface PerformanceAttributes {
  id: number;
  userId?: number;
  groupName: string;
  type: PerformanceType;
  date: Date;
  dateRange?: string;
  ranking?: number;
  totalAssignedQty: number;
  newAssignedNum: number;
  targetRepayRate: number;
  targetNum: number;
  numOfApps: number;
  appRate: number;
  numOfApprovedApps: number;
  handleNum: number;
  bonus: number;
  status: string;
  daysOfEmployment?: number;
  numOfCalls?: number;
  numOfConnections?: number;
  phoneConnectionRate?: number;
  totalCallDuration?: number;
  firstCallTime?: Date;
  latestCallTime?: Date;
  caseCoverage?: number;
  numOfSms?: number;
}

// Ajoutez cette interface pour les associations
interface PerformanceAssociations {
  user?: User;
}

export class Performance
  extends Model<PerformanceAttributes>
  implements PerformanceAttributes, PerformanceAssociations
{
  public id!: number;
  public userId?: number;
  public groupName!: string;
  public type!: PerformanceType;
  public date!: Date;
  public dateRange?: string;
  public ranking?: number;
  public totalAssignedQty!: number;
  public newAssignedNum!: number;
  public targetRepayRate!: number;
  public targetNum!: number;
  public numOfApps!: number;
  public appRate!: number;
  public numOfApprovedApps!: number;
  public handleNum!: number;
  public bonus!: number;
  public status!: string;
  public daysOfEmployment?: number;
  public numOfCalls?: number;
  public numOfConnections?: number;
  public phoneConnectionRate?: number;
  public totalCallDuration?: number;
  public firstCallTime?: Date;
  public latestCallTime?: Date;
  public caseCoverage?: number;
  public numOfSms?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  declare user?: User; // Déclaration de l'association
}

Performance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      field: 'user_id',
    },
    groupName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'group_name',
    },
    type: {
      type: DataTypes.ENUM(...Object.values(PerformanceType)),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    dateRange: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'date_range',
    },
    ranking: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    totalAssignedQty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'total_assigned_qty',
    },
    newAssignedNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'new_assigned_num',
    },
    targetRepayRate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      field: 'target_repay_rate',
    },
    targetNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'target_num',
    },
    numOfApps: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'num_of_apps',
    },
    appRate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      field: 'app_rate',
    },
    numOfApprovedApps: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'num_of_approved_apps',
    },
    handleNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'handle_num',
    },
    bonus: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    daysOfEmployment: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'days_of_employment',
    },
    numOfCalls: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'num_of_calls',
    },
    numOfConnections: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'num_of_connections',
    },
    phoneConnectionRate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      field: 'phone_connection_rate',
    },
    totalCallDuration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'total_call_duration',
    },
    firstCallTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'first_call_time',
    },
    latestCallTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'latest_call_time',
    },
    caseCoverage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      field: 'case_coverage',
    },
    numOfSms: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'num_of_sms',
    },
  },
  {
    sequelize,
    tableName: 'performances',
    timestamps: true,
  }
);
