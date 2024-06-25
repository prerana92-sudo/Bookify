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
exports.getCartItemsController = exports.updateCartItemController = exports.removeFromCartController = exports.addToCartController = void 0;
const cart_service_1 = require("../services/cart.service");
const addToCartController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId, quantity } = req.body;
        const result = yield (0, cart_service_1.addBookToCart)(req.jwtData.userName, bookId, quantity);
        res.status(result.status).json(result);
    }
    catch (error) {
        console.log(`Error occurred while adding book to cart: ${error}`);
        res.status(500).json({
            status: 500,
            message: "Some error occurred while adding book to cart",
        });
    }
});
exports.addToCartController = addToCartController;
const removeFromCartController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.body;
        const result = yield (0, cart_service_1.removeFromCart)(req.jwtData.userName, bookId);
        res.status(result.status).json(result);
    }
    catch (error) {
        console.log(`Error occurred while removing item from cart: ${error}`);
        res.status(500).json({
            status: 500,
            message: "Some error occurred while removing item from cart",
        });
    }
});
exports.removeFromCartController = removeFromCartController;
const updateCartItemController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId, newQuantity } = req.body;
        const result = yield (0, cart_service_1.updateCartItem)(req.jwtData.userName, bookId, newQuantity);
        res.status(result.status).json(result);
    }
    catch (error) {
        console.log(`Error occurred while updating cart item: ${error}`);
        res.status(500).json({
            status: 500,
            message: "Some error occurred while updating cart item",
        });
    }
});
exports.updateCartItemController = updateCartItemController;
const getCartItemsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, cart_service_1.getCartItems)(req.jwtData.userName);
        res.status(result.status).json(result);
    }
    catch (error) {
        console.log(`Error occurred while fetching cart items: ${error}`);
        res.status(500).json({
            status: 500,
            message: "Some error occurred while fetching cart items",
        });
    }
});
exports.getCartItemsController = getCartItemsController;
