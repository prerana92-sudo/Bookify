"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdminUser = exports.deleteAdminUser = exports.updateAdminUser = exports.getAdminUserById = exports.getAdminUsers = exports.createAdminUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const adminusers_1 = __importDefault(require("../models/adminusers"));
const auth_1 = require("../middlewares/auth");
// Function to create a new admin user
const createAdminUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield adminusers_1.default.findOne({
            where: { email: userData.email },
        });
        if (checkUser) {
            return {
                status: 400,
                message: "Admin user with this email already exists!",
            };
        }
        const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
        userData.password = hashedPassword;
        const newAdminUser = yield adminusers_1.default.create(userData);
        return {
            status: 200,
            message: "Admin user created successfully!",
            data: newAdminUser,
        };
    }
    catch (error) {
        console.log(`Error occurred while adding admin user: ${error}`);
        return {
            status: 500,
            message: "Some error occurred!",
        };
    }
});
exports.createAdminUser = createAdminUser;
// Function to get all admin users
const getAdminUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminUsers = yield adminusers_1.default.findAll({
            order: [["createdAt", "DESC"]],
        });
        return {
            status: 200,
            message: "Admin users retrieved successfully!",
            data: adminUsers,
        };
    }
    catch (error) {
        console.log(`Error occurred while fetching admin users: ${error}`);
        return {
            status: 500,
            message: "Some error occurred!",
        };
    }
});
exports.getAdminUsers = getAdminUsers;
// Function to get admin user by ID
const getAdminUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminUser = yield adminusers_1.default.findOne({ where: { id: userId } });
        if (!adminUser) {
            return { status: 404, message: "Admin user not found!" };
        }
        return {
            status: 200,
            message: "Admin user retrieved successfully!",
            data: adminUser,
        };
    }
    catch (error) {
        console.log(`Error occurred while fetching admin user: ${error}`);
        return {
            status: 500,
            message: "Some error occurred!",
        };
    }
});
exports.getAdminUserById = getAdminUserById;
// Function to update admin user
const updateAdminUser = (userId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminUser = yield adminusers_1.default.findOne({ where: { id: userId } });
        if (!adminUser) {
            return { status: 404, message: "Admin user not found!" };
        }
        yield adminUser.update(updatedData);
        return {
            status: 200,
            message: "Admin user updated successfully!",
            data: adminUser,
        };
    }
    catch (error) {
        console.log(`Error occurred while updating admin user: ${error}`);
        return {
            status: 500,
            message: "Some error occurred!",
        };
    }
});
exports.updateAdminUser = updateAdminUser;
// Function to delete admin user
const deleteAdminUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminUser = yield adminusers_1.default.findOne({ where: { id: userId } });
        if (!adminUser) {
            return { status: 404, message: "Admin user not found!" };
        }
        yield adminUser.destroy();
        return {
            status: 200,
            message: "Admin user deleted successfully!",
        };
    }
    catch (error) {
        console.log(`Error occurred while deleting admin user: ${error}`);
        return {
            status: 500,
            message: "Some error occurred!",
        };
    }
});
exports.deleteAdminUser = deleteAdminUser;
// Function to login admin user
const loginAdminUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminUser = yield adminusers_1.default.findOne({ where: { email } });
        if (!adminUser) {
            return { status: 404, message: "Admin user not found!" };
        }
        const comparePassword = yield bcrypt_1.default.compare(password, adminUser.password);
        if (!comparePassword) {
            return { status: 400, message: "Invalid Password, Try again!" };
        }
        const accessToken = yield (0, auth_1.generateAccessToken)({ email: adminUser.email, userId: adminUser.id, type: 'Admin' }, '1h');
        return {
            status: 200,
            message: "Admin user logged in successfully!",
            data: {
                accessToken: accessToken,
                user: {
                    email: adminUser.email,
                    userId: adminUser.id,
                },
            },
        };
    }
    catch (error) {
        console.log(`Error occurred while admin user login: ${error}`);
        return {
            status: 500,
            message: "Some error occurred!",
        };
    }
});
exports.loginAdminUser = loginAdminUser;
