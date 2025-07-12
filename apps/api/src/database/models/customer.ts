import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connection';

export enum CustomerType {
  NEW = 'new',
  OLD = 'old',
  REGISTERED = 'registered',
}

interface CustomerAttributes {
  id: number;
  mobile: string;
  name: string;
  type: CustomerType;
  userLabel?: string; // Ajoutez cette ligne
  district?: string; // Ajoutez cette ligne
  appName?: string;
  followUpPerson?: string;
  whetherApply: boolean;
  appTime?: Date;
  allocationTime?: Date;
  latestFollowUpTime?: Date;
  followUpResults?: string;
  descFollowUp?: string;
  whetherAssigned: boolean;
  prevRepaymentTime?: Date;
  telemarketerId?: number;
}

export class Customer
  extends Model<CustomerAttributes>
  implements CustomerAttributes
{
  public id!: number;
  public mobile!: string;
  public name!: string;
  public type!: CustomerType;
  public userLabel!: string | null; // Ajoutez cette ligne
  public district!: string | null; // Ajoutez cette ligne
  public appName?: string;
  public followUpPerson?: string;
  public whetherApply!: boolean;
  public appTime?: Date;
  public allocationTime?: Date;
  public latestFollowUpTime?: Date;
  public followUpResults?: string;
  public descFollowUp?: string;
  public whetherAssigned!: boolean;
  public prevRepaymentTime?: Date;
  public telemarketerId?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    mobile: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(CustomerType)),
      allowNull: false,
    },
    userLabel: {
      // Ajoutez cette configuration
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'user_label',
    },
    district: {
      // Ajoutez cette configuration
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    appName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'app_name',
    },
    followUpPerson: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'follow_up_person',
    },
    whetherApply: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'whether_apply',
    },
    appTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'app_time',
    },
    allocationTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'allocation_time',
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
    prevRepaymentTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'prev_repayment_time',
    },
    telemarketerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      field: 'telemarketer_id',
    },
  },
  {
    sequelize,
    tableName: 'customers',
    timestamps: true,
  }
);
