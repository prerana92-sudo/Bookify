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
exports.searchPurchaseData = exports.fetchUserPurchaseHistory = exports.addPurchaseData = void 0;
const purchase_1 = __importDefault(require("../models/purchase"));
const book_1 = __importDefault(require("../models/book"));
const i18next_1 = __importDefault(require("i18next"));
const sequelize_1 = require("sequelize");
const user_1 = __importDefault(require("../models/user"));
const useraddress_1 = __importDefault(require("../models/useraddress"));
function generateRandomId() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomId = "";
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        randomId += chars[randomIndex];
    }
    return randomId;
}
const addPurchaseData = (purchaseData, userName, lang) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        purchaseData.purchaseId = generateRandomId();
        const book = yield book_1.default.findByPk(purchaseData.bookId);
        const user = yield user_1.default.findOne({ where: { userName } });
        if (!book) {
            return {
                status: 404,
                message: "Book doesnot exist!",
            };
        }
        if (!user) {
            return {
                status: 403,
                message: "Invalid user access, User not found!",
            };
        }
        purchaseData.userId = user === null || user === void 0 ? void 0 : user.id;
        const newPurchase = yield purchase_1.default.create(purchaseData);
        yield book.update({ stock: book.stock - 1 });
        const purchase = yield purchase_1.default.findByPk(newPurchase.id, {
            include: [
                { model: book_1.default },
                {
                    model: user_1.default,
                    attributes: ["name", "langPreference"],
                },
                {
                    model: useraddress_1.default,
                },
            ],
        });
        return {
            status: 200,
            message: i18next_1.default.t("payment_success_message", { lng: lang }),
            data: purchase,
        };
        // const userLang = user?.langPreference;
        // const emailTemplate =
        //   userLang === "en"
        //     ? PURCHASE_SUCCESSFULL_EMAIL_ENGLISH
        //     : PURCHASE_SUCCESSFULL_EMAIL_FRENCH;
        // await sendEmail(emailTemplate, "sumit.mahto@home-connections.co.uk", {
        //   name: user?.name,
        //   bookName: book?.name,
        //   price: book?.price,
        //   date: purchase.createdAt,
        // });
    }
    catch (error) {
        console.log(`Error occurred while adding purchase data: ${error}`);
        return {
            status: 500,
            message: "Some error occurred while adding purchase data",
        };
    }
});
exports.addPurchaseData = addPurchaseData;
const fetchUserPurchaseHistory = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ where: { userName } });
        if (!user) {
            return {
                status: 403,
                message: "Invalid user access, User not found!",
            };
        }
        const purchase = yield purchase_1.default.findAll({
            where: { userId: user.id },
            include: [{ model: book_1.default }],
            order: [["createdAt", "DESC"]],
        });
        if (!purchase) {
            return {
                status: 404,
                message: "No Purchases!",
            };
        }
        return {
            status: 200,
            message: "Purchase History fetched successfully!",
            data: purchase,
        };
    }
    catch (error) {
        console.log(`Error occurred while fetching purchase data: ${error}`);
        return {
            status: 500,
            message: "Some error occurred while fetching purchase data",
        };
    }
});
exports.fetchUserPurchaseHistory = fetchUserPurchaseHistory;
const searchPurchaseData = (userName, searchString) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ where: { userName } });
        if (!user) {
            return {
                status: 403,
                message: "Invalid user access, User not found!",
            };
        }
        const purchase = yield purchase_1.default.findAll({
            where: { userId: user.id },
            include: [
                { model: book_1.default, where: { name: { [sequelize_1.Op.substring]: searchString } } },
                { model: user_1.default, attributes: ["name", "langPreference"] },
                { model: useraddress_1.default },
            ],
        });
        return {
            status: 200,
            message: "Purchase Record fetched successfully!",
            data: purchase,
        };
    }
    catch (error) {
        console.log(`Error occurred while searching purchase data: ${error}`);
        return {
            status: 500,
            message: "Some error occurred!",
        };
    }
});
exports.searchPurchaseData = searchPurchaseData;
