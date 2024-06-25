import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Purchase from "./purchase";

interface UserAddressAttributes {
  id?: number;
  userId: number;
  address: string;
  postcode: string;
  city: string;
  state: string;
  country: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class UserAddress extends Model<UserAddressAttributes> implements UserAddressAttributes {
  public id!: number;
  public userId!: number;
  public address!: string;
  public postcode!: string;
  public city!: string;
  public state!: string;
  public country!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

UserAddress.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "UserAddress",
  }
);

UserAddress.hasMany(Purchase, { foreignKey: "addressId" });
Purchase.belongsTo(UserAddress, { foreignKey: "addressId" });

export default UserAddress;
