import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../connection';

export enum UserRole {
  ADMIN = 'admin',
  TELEMARKETER = 'telemarketer',
  COLLECTOR = 'collector',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  name: string;
  workNumber: string;
  role: UserRole;
  group?: string;
  entryDate?: Date;
  weights?: number;
  voiceCollection: boolean;
  staffLevel?: string;
  status: UserStatus;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;
  collectionDistributionRules?: string;
  rulesApprovingDistribution?: string;
  lastLoginIp?: string;
}

interface UserAssociations {
  performances?: Performance[];
}

export class User
  extends Model<UserAttributes>
  implements UserAttributes, UserAssociations
{
  public id!: number;
  public email!: string;
  public password!: string;
  public name!: string;
  public workNumber!: string;
  public role!: UserRole;
  public group?: string;
  public entryDate?: Date;
  public weights?: number;
  public voiceCollection!: boolean;
  public staffLevel?: string;
  public status!: UserStatus;
  public resetPasswordToken!: string | null;
  public resetPasswordExpires!: Date | null;
  public collectionDistributionRules?: string;
  public rulesApprovingDistribution?: string;
  public lastLoginIp?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  declare performances?: Performance[];
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    workNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      field: 'work_number',
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
    },
    group: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    entryDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'entry_date',
    },
    weights: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    voiceCollection: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'voice_collection',
    },
    staffLevel: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'staff_level',
    },
    status: {
      type: DataTypes.ENUM(...Object.values(UserStatus)),
      allowNull: false,
      defaultValue: UserStatus.ACTIVE,
    },
    resetPasswordToken: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'reset_password_token',
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'reset_password_expires',
    },
    collectionDistributionRules: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'collection_distribution_rules',
    },
    rulesApprovingDistribution: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'rules_approving_distribution',
    },
    lastLoginIp: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'last_login_ip',
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);
