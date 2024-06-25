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
exports.fetchUserWishlistController = exports.removeFromWishlistController = exports.addToWishlistController = void 0;
const wishlist_service_1 = require("../services/wishlist.service");
const addToWishlistController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.body;
        const result = yield (0, wishlist_service_1.addToWishlist)(req.jwtData.userName, bookId);
        res.status(result.status).json(result);
    }
    catch (error) {
        console.log(`Error occurred while adding book to wishlist: ${error}`);
        res.status(500).json({
            status: 500,
            message: "Some error occurred while adding book to wishlist",
        });
    }
});
exports.addToWishlistController = addToWishlistController;
const removeFromWishlistController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.body;
        const result = yield (0, wishlist_service_1.removeFromWishlist)(req.jwtData.userName, bookId);
        res.status(result.status).json(result);
    }
    catch (error) {
        console.log(`Error occurred while removing book from wishlist: ${error}`);
        res.status(500).json({
            status: 500,
            message: "Some error occurred while removing book from wishlist",
        });
    }
});
exports.removeFromWishlistController = removeFromWishlistController;
const fetchUserWishlistController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, wishlist_service_1.fetchUserWishlistData)(req.jwtData.userName);
        res.status(result.status).json(result);
    }
    catch (error) {
        console.log(`Error occurred while fetching user wishlist data: ${error}`);
        res.status(500).json({
            status: 500,
            message: "Some error occurred while fetching user wishlist data",
        });
    }
});
exports.fetchUserWishlistController = fetchUserWishlistController;
