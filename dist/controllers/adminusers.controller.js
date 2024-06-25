"use strict";
// adminUserController.js
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.loginAdminUser = exports.deleteAdminUser = exports.updateAdminUser = exports.getAdminUserById = exports.getAdminUsers = exports.createAdminUser = void 0;
const adminUserService = __importStar(require("../services/adminusers.service"));
const createAdminUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const result = yield adminUserService.createAdminUser({
        name,
        email,
        password,
    });
    res.status(result.status).json(result);
});
exports.createAdminUser = createAdminUser;
const getAdminUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adminUserService.getAdminUsers();
    res.status(result.status).json(result);
});
exports.getAdminUsers = getAdminUsers;
const getAdminUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    const result = yield adminUserService.getAdminUserById(userId);
    res.status(result.status).json(result);
});
exports.getAdminUserById = getAdminUserById;
const updateAdminUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    const updatedData = req.body;
    const result = yield adminUserService.updateAdminUser(userId, updatedData);
    res.status(result.status).json(result);
});
exports.updateAdminUser = updateAdminUser;
const deleteAdminUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    const result = yield adminUserService.deleteAdminUser(userId);
    res.status(result.status).json(result);
});
exports.deleteAdminUser = deleteAdminUser;
const loginAdminUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const result = yield adminUserService.loginAdminUser(email, password);
    res.status(result.status).json(result);
});
exports.loginAdminUser = loginAdminUser;
