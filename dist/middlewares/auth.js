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
exports.setLoggedInUserLangInReq = exports.generateAccessToken = exports.verifyAdminAccess = exports.verifyAccess = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = "your-secret-key";
// Middleware to extract JWT properties from the request
const verifyAccess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, "your-secret-key");
            req.jwtData = decoded;
            if (decoded.type === "User") {
                next();
            }
            else {
                return res
                    .status(403)
                    .json({ message: "Insufficient permission for this action." });
            }
        }
        catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
    }
    else {
        return res.status(401).json({ message: "Token not provided" });
    }
});
exports.verifyAccess = verifyAccess;
const verifyAdminAccess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, "your-secret-key");
            req.jwtData = decoded;
            if (decoded.type === "Admin") {
                next();
            }
            else {
                return res
                    .status(403)
                    .json({ message: "Insufficient permission for this action." });
            }
        }
        catch (error) {
            console.log(`${error}: error while decoding admin token!`);
            return res.status(401).json({ message: "Invalid token" });
        }
    }
    else {
        return res.status(401).json({ message: "Token not provided" });
    }
});
exports.verifyAdminAccess = verifyAdminAccess;
// Function to generate JWT token
const generateAccessToken = (payload_1, ...args_1) => __awaiter(void 0, [payload_1, ...args_1], void 0, function* (payload, expiresIn = "1d") {
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn });
});
exports.generateAccessToken = generateAccessToken;
const setLoggedInUserLangInReq = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield user_1.default.findOne({
            where: { userName: req.jwtData.userName },
        });
        req.userLang = userData === null || userData === void 0 ? void 0 : userData.langPreference;
        next();
    }
    catch (error) {
        console.log(`error occurred while setting user's lang preference in req: ${error}`);
    }
});
exports.setLoggedInUserLangInReq = setLoggedInUserLangInReq;
