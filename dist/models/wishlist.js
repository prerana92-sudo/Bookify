"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Wishlist extends sequelize_1.Model {
}
Wishlist.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "User",
            key: "id",
        },
    },
    bookId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Book",
            key: "id",
        },
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    sequelize: database_1.default,
    modelName: "Wishlist",
});
exports.default = Wishlist;
