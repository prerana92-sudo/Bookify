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
exports.sendLoginMails = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false, // Use `true` for port 465, `false` for all other ports
//   auth: {
//     user: "senddemomails@yahoo.com",
//     pass:"SecurePassword123@",
//   },
// });
const transporter = nodemailer_1.default.createTransport({
    service: 'yahoo', // Specify the email service
    auth: {
        user: 'senddemomails@yahoo.com',
        pass: 'SecurePassword123@', // Use your actual Yahoo email password or an app-specific password
    },
});
// async..await is not allowed in global scope, must use a wrapper
function sendLoginMails() {
    return __awaiter(this, void 0, void 0, function* () {
        // send mail with defined transport object
        const info = yield transporter.sendMail({
            from: '"Prerana Rath 👻" <senddemomails@yahoo.com>', // sender address
            to: "adminbookify@yopmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Welcome To Bookify?</b>", // html body
        });
        console.log("Message sent: %s", info.messageId);
    });
}
exports.sendLoginMails = sendLoginMails;
