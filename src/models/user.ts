import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Purchase from "./purchase";
import Wishlist from "./wishlist";
import ShoppingCart from "./shoppingcart";
import UserAddress from "./useraddress";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  userName: string;
  langPreference: string;
  membership: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public password!: string;
  public userName!: string;
  public langPreference!: string;
  public membership!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
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
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    langPreference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    membership: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

User.hasMany(Purchase, { foreignKey: "userId" });
Purchase.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Wishlist, { foreignKey: "userId" });
Wishlist.belongsTo(User, { foreignKey: "userId" });

User.hasMany(ShoppingCart, { foreignKey: "userId" });
ShoppingCart.belongsTo(User, { foreignKey: "userId" });

User.hasMany(UserAddress, { foreignKey: "userId" });
UserAddress.belongsTo(User, { foreignKey: "userId" });

export default User;
