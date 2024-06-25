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
exports.fetchUserAddresses = exports.addUserAddress = exports.userLogin = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const useraddress_1 = __importDefault(require("../models/useraddress"));
const password_1 = require("../middlewares/password");
const auth_1 = require("../middlewares/auth");
const i18next_1 = __importDefault(require("i18next"));
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield user_1.default.findOne({
            where: { email: userData.email, phone: userData.phone },
        });
        if (checkUser) {
            return {
                status: 400,
                message: "User with this email and phone no already exists!",
            };
        }
        const encryptedPassword = yield (0, password_1.encryptPassword)(userData.password);
        userData.password = encryptedPassword;
        const newUser = yield user_1.default.create(userData);
        return {
            status: 200,
            message: i18next_1.default.t("welcome"),
            data: newUser,
        };
    }
    catch (error) {
        console.log(`Error occurred while adding user: ${error}`);
        return {
            status: 500,
            message: "Some error occurred!",
        };
    }
});
exports.createUser = createUser;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll({
            order: [["createdAt", "DESC"]],
        });
        return {
            status: 200,
            message: "Users retrieved successfully!",
            data: users,
        };
    }
    catch (error) {
        console.log(`Error occurred while fetching users: ${error}`);
        return {
            status: 500,
            message: "Some error occurred!",
        };
    }
});
exports.getUsers = getUsers;
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ where: { id: userId } });
        if (!user) {
            return { status: 404, message: "User not found!" };
        }
        return {
            status: 200,
            message: "User retrieved successfully!",
            data: user,
        };
    }
    catch (error) {
        console.log(`Error occurred while fetching user: ${error}`);
        return {
            status: 500,
            message: "Some error occurred!",
        };
    }
});
exports.getUserById = getUserById;
const updateUser = (userId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ where: { id: userId } });
        if (!user) {
            return { status: 404, message: "User not found!" };
        }
        yield user.update(updatedData);
        return {
            status: 200,
            message: "User updated successfully!",
            data: user,
        };
    }
    catch (error) {
        console.log(`Error occurred while updating user: ${error}`);
        return {
            status: 500,
            message: "Some error occurred!",
        };
    }
});
exports.updateUser = updateUser;
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ where: { id: userId } });
        if (!user) {
            return { status: 404, message: "User not found!" };
        }
        yield user.destroy();
        return {
            status: 200,
            message: "User deleted successfully!",
        };
    }
    catch (error) {
        console.log(`Error occurred while deleting user: ${error}`);
        return {
            status: 500,
            message: "Some error occurred!",
        };
    }
});
exports.deleteUser = deleteUser;
const userLogin = (userName, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ where: { userName } });
        if (!user) {
            return { status: 404, message: "User not found!" };
        }
        const comparePassword = yield (0, password_1.decryptPassword)(password, user.password);
        if (!comparePassword) {
            return { status: 400, message: "Invalid Password, Try again!" };
        }
        const accessToken = yield (0, auth_1.generateAccessToken)({ userName: user.userName, userId: user.id, type: 'User' }, "1h");
        return {
            status: 200,
            message: i18next_1.default.t("login_success", { lng: user.langPreference }),
            data: {
                accessToken: accessToken,
                user: {
                    userName: user.userName,
                    userId: user.id,
                    lang: user.langPreference,
                },
            },
        };
    }
    catch (error) {
        console.log(`Error occurred while user login: ${error}`);
        return {
            status: 500,
            message: "Some error occurred!",
        };
    }
});
exports.userLogin = userLogin;
const addUserAddress = (userName, addressBody) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ where: { userName } });
        if (!user) {
            return {
                status: 403,
                message: "Invalid user access, User not found!",
            };
        }
        addressBody.userId = user.id;
        const addAddress = yield useraddress_1.default.create(addressBody);
        return {
            status: 200,
            message: "User address added successfully!",
            data: addAddress,
        };
    }
    catch (error) {
        console.log(`Error occurred while adding user address: ${error}`);
        return {
            status: 500,
            message: "Some error occurred!",
        };
    }
});
exports.addUserAddress = addUserAddress;
const fetchUserAddresses = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ where: { userName } });
        if (!user) {
            return {
                status: 403,
                message: "Invalid user access, User not found!",
            };
        }
        const userAddressList = yield useraddress_1.default.findAll({
            where: { userId: user.id },
        });
        return {
            status: 200,
            message: "User address added successfully!",
            data: userAddressList,
        };
    }
    catch (error) {
        console.log(`Error occurred while fetching user addresses: ${error}`);
        return {
            status: 500,
            message: "Some error occurred!",
        };
    }
});
exports.fetchUserAddresses = fetchUserAddresses;
