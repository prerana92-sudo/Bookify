import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import {sendLoginMails} from '../middlewares/email';

interface AdminUserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  status?: 'Active' | 'Inactive';
  createdAt?: Date;
  updatedAt?: Date;
}

class AdminUser extends Model<AdminUserAttributes> implements AdminUserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public status!: 'Active' | 'Inactive';
  public createdAt!: Date;
  public updatedAt!: Date;
}

AdminUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true // Validate email format
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Active', 'Inactive'),
      allowNull: false,
      defaultValue: 'Active', // Default value
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW // Default value
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW // Default value
    }
  },
  {
    sequelize,
    modelName: "AdminUser",
    tableName: "adminusers",
    hooks: {
        // beforeCreate: (user, options) => {
        //   console.log('Before create hook triggered');
        //   // Implement custom logic (e.g., password hashing) here
        // },
        afterCreate: async (user, options) => {
            // await sendLoginMails();
        }
      }
  }
);

export default AdminUser;
