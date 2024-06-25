"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const purchase_1 = __importDefault(require("./purchase"));
const wishlist_1 = __importDefault(require("./wishlist"));
const shoppingcart_1 = __importDefault(require("./shoppingcart"));
class Book extends sequelize_1.Model {
}
Book.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    releaseDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    isbn: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    genre: {
        type: sequelize_1.DataTypes.ENUM("non-fiction", "fiction"),
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: "Book",
});
Book.hasMany(purchase_1.default, { foreignKey: "bookId" });
purchase_1.default.belongsTo(Book, { foreignKey: "bookId" });
Book.hasMany(wishlist_1.default, { foreignKey: "bookId" });
wishlist_1.default.belongsTo(Book, { foreignKey: "bookId" });
Book.hasMany(shoppingcart_1.default, { foreignKey: "bookId" });
shoppingcart_1.default.belongsTo(Book, { foreignKey: "bookId" });
exports.default = Book;
