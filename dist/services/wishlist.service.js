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
exports.fetchUserWishlistData = exports.removeFromWishlist = exports.addToWishlist = void 0;
const user_1 = __importDefault(require("../models/user"));
const book_1 = __importDefault(require("../models/book"));
const wishlist_1 = __importDefault(require("../models/wishlist"));
const addToWishlist = (userName, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield user_1.default.findOne({ where: { userName } });
        if (!checkUser) {
            return {
                status: 403,
                message: "Invalid user access, User not found!",
            };
        }
        const checkBook = yield book_1.default.findByPk(bookId);
        if (!checkBook) {
            return {
                status: 404,
                message: "Book doesnot exist!",
            };
        }
        const addData = yield wishlist_1.default.create({ userId: checkUser.id, bookId });
        return {
            status: 200,
            message: "Added to wishlist succesfully!",
            data: addData,
        };
    }
    catch (error) {
        console.log(`Error occurred while adding book to wishlist: ${error}`);
        return {
            status: 500,
            message: "Some error occurred!",
        };
    }
});
exports.addToWishlist = addToWishlist;
const removeFromWishlist = (userName, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield user_1.default.findOne({ where: { userName } });
        if (!checkUser) {
            return {
                status: 403,
                message: "Invalid user access, User not found!",
            };
        }
        const checkBook = yield book_1.default.findByPk(bookId);
        if (!checkBook) {
            return {
                status: 404,
                message: "Book does not exist!",
            };
        }
        const removeData = yield wishlist_1.default.destroy({
            where: {
                userId: checkUser.id,
                bookId,
            },
        });
        if (removeData === 0) {
            return {
                status: 404,
                message: "Book not found in wishlist!",
            };
        }
        return {
            status: 200,
            message: "Removed from wishlist successfully!",
        };
    }
    catch (error) {
        console.log(`Error occurred while removing book from wishlist: ${error}`);
        return {
            status: 500,
            message: "Some error occurred!",
        };
    }
});
exports.removeFromWishlist = removeFromWishlist;
const fetchUserWishlistData = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield user_1.default.findOne({ where: { userName } });
        if (!checkUser) {
            return {
                status: 403,
                message: "Invalid user access, User not found!",
            };
        }
        const userWishlistData = yield wishlist_1.default.findAll({
            where: { userId: checkUser.id },
            include: [{ model: book_1.default }],
            order: [["createdAt", "DESC"]],
        });
        const bookData = userWishlistData.map((wishlistItem) => wishlistItem.Book);
        return {
            status: 200,
            message: "User wishlist fetched successfully!",
            data: { user: checkUser, wishlist: bookData },
        };
    }
    catch (error) {
        console.log(`Error occurred while fetching user wishlist data: ${error}`);
        return {
            status: 500,
            message: "Some error occurred!",
        };
    }
});
exports.fetchUserWishlistData = fetchUserWishlistData;
