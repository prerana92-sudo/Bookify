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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUserAddressesController = exports.addUserAddressController = exports.loginUser = exports.deleteUserData = exports.updateUserData = exports.getUserData = exports.getUserList = exports.addUser = void 0;
const user_services_1 = require("../services/user.services");
// Controller function for creating a new user
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, user_services_1.createUser)(req.body);
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
});
exports.addUser = addUser;
// Controller function for getting all users
const getUserList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, user_services_1.getUsers)();
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
});
exports.getUserList = getUserList;
// Controller function for getting a user by ID
const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, user_services_1.getUserById)(req.params.userId);
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
});
exports.getUserData = getUserData;
// Controller function for updating a user
const updateUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, user_services_1.updateUser)(req.params.userId, req.body);
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
});
exports.updateUserData = updateUserData;
// Controller function for deleting a user
const deleteUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, user_services_1.deleteUser)(req.params.userId);
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
});
exports.deleteUserData = deleteUserData;
// Controller function for user login
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, user_services_1.userLogin)(req.body.userName, req.body.password);
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
});
exports.loginUser = loginUser;
const addUserAddressController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userName = req.jwtData.userName;
        console.log(userName);
        const result = yield (0, user_services_1.addUserAddress)(userName, req.body);
        res.status(result.status).json(result);
    }
    catch (error) {
        console.log(`Error occurred while adding user address: ${error}`);
        res.status(500).json({
            status: 500,
            message: "Some error occurred while adding user address",
        });
    }
});
exports.addUserAddressController = addUserAddressController;
const fetchUserAddressesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userName = req.jwtData.userName;
        const result = yield (0, user_services_1.fetchUserAddresses)(userName);
        res.status(result.status).json(result);
    }
    catch (error) {
        console.log(`Error occurred while fetching user addresses: ${error}`);
        res.status(500).json({
            status: 500,
            message: "Some error occurred while fetching user addresses",
        });
    }
});
exports.fetchUserAddressesController = fetchUserAddressesController;
