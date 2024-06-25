import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Purchase from "./purchase";
import Wishlist from "./wishlist";
import ShoppingCart from "./shoppingcart";

interface BookAttributes {
  name?: string;
  author?: string;
  price?: number;
  stock?: number;
  releaseDate?: Date;
  isbn?: string;
  genre?: "non-fiction" | "fiction";
}

class Book extends Model<BookAttributes> implements BookAttributes {
  public name!: string;
  public author!: string;
  public price!: number;
  public stock!: number;
  public releaseDate!: Date;
  public isbn!: string;
  public genre!: "non-fiction" | "fiction";
}

Book.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    genre: {
      type: DataTypes.ENUM("non-fiction", "fiction"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Book",
  }
);

Book.hasMany(Purchase, { foreignKey: "bookId" });
Purchase.belongsTo(Book, { foreignKey: "bookId" });

Book.hasMany(Wishlist, { foreignKey: "bookId" });
Wishlist.belongsTo(Book, { foreignKey: "bookId" });

Book.hasMany(ShoppingCart, { foreignKey: "bookId" });
ShoppingCart.belongsTo(Book, { foreignKey: "bookId" });

export default Book;
