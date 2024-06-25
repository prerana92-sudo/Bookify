import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface PurchaseAttributes {
  id?: number;
  bookId: number;
  userId: number;
  addressId: number;
  purchaseId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Purchase extends Model<PurchaseAttributes> implements PurchaseAttributes {
  public id!: number;
  public bookId!: number;
  public userId!: number;
  public addressId!: number;
  public purchaseId!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

}

Purchase.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Book',
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id',
    },
  },
  addressId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'UserAddress',
      key: 'id',
    },
  },
  purchaseId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  modelName: 'Purchase',
});



export default Purchase;
