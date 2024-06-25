import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface ShoppingCartAttributes {
  id?: number;
  userId: number;
  bookId: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

class ShoppingCart extends Model<ShoppingCartAttributes> implements ShoppingCartAttributes {
  public id!: number;
  public userId!: number;
  public bookId!: number;
  public quantity!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

ShoppingCart.init(
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
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Book",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ShoppingCart",
  }
);

export default ShoppingCart;
