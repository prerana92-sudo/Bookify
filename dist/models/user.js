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
const useraddress_1 = __importDefault(require("./useraddress"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    langPreference: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    membership: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: "User",
});
User.hasMany(purchase_1.default, { foreignKey: "userId" });
purchase_1.default.belongsTo(User, { foreignKey: "userId" });
User.hasMany(wishlist_1.default, { foreignKey: "userId" });
wishlist_1.default.belongsTo(User, { foreignKey: "userId" });
User.hasMany(shoppingcart_1.default, { foreignKey: "userId" });
shoppingcart_1.default.belongsTo(User, { foreignKey: "userId" });
User.hasMany(useraddress_1.default, { foreignKey: "userId" });
useraddress_1.default.belongsTo(User, { foreignKey: "userId" });
exports.default = User;
