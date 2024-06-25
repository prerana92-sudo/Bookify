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
exports.sendTextNotification = exports.sendEmail = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
const generateNotifyAuthToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const iss = process.env.NOTIFY_AUTH_TOKEN_SERVICEID;
    const secretKey = process.env.NOTIFY_AUTH_TOKEN_SECRET;
    if (!iss || !secretKey) {
        throw new Error("Missing environment variables");
    }
    const iat = Math.floor(Date.now() / 1000);
    const payload = {
        iss,
        iat,
    };
    const encodedToken = jsonwebtoken_1.default.sign(payload, secretKey);
    return encodedToken;
});
function sendEmail(emailTemplate, Recipient, emailData) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = process.env.NOTIFY_EMAIL_API_URL;
        if (!apiUrl) {
            throw new Error("Missing environment variables");
        }
        const token = yield generateNotifyAuthToken();
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
        console.log(emailData);
        try {
            const response = yield axios_1.default.post(apiUrl, {
                email_address: Recipient,
                template_id: emailTemplate,
                personalisation: emailData
            }, { headers });
            console.log(response.data);
        }
        catch (error) {
            console.error("Error sending email:", error);
        }
    });
}
exports.sendEmail = sendEmail;
function sendTextNotification(messageTemplate, Recipient, messageData) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = process.env.NOTIFY_TEXT_MESSAGE_API_URL;
        if (!apiUrl) {
            throw new Error("Missing environment variables");
        }
        const token = yield generateNotifyAuthToken();
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
        try {
            const response = yield axios_1.default.post(apiUrl, {
                phone_number: Recipient,
                template_id: messageTemplate,
                personalisation: messageData
            }, { headers });
            console.log(response.data);
        }
        catch (error) {
            console.error("Error sending email:", error);
        }
    });
}
exports.sendTextNotification = sendTextNotification;
