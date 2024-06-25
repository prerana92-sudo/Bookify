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
exports.calculateTotal = exports.getCartItems = exports.updateCartItem = exports.removeFromCart = exports.addBookToCart = void 0;
const shoppingcart_1 = __importDefault(require("../models/shoppingcart"));
const user_1 = __importDefault(require("../models/user"));
const book_1 = __importDefault(require("../models/book"));
const addBookToCart = (userName, bookId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (checkBook.stock === 0) {
            return {
                status: 400,
                message: "Book out of stock!",
            };
        }
        const checkShoppingCartQuantity = yield shoppingcart_1.default.findAll({
            where: { userId: checkUser.id },
        });
        if (checkShoppingCartQuantity.length > 10) {
            return {
                status: 409,
                message: "Cannot select more than 10 unique items at once!",
            };
        }
        const addToCart = yield shoppingcart_1.default.create({
            userId: checkUser.id,
            bookId,
            quantity,
        });
        return {
            status: 200,
            message: "Item added to cart successfully!",
            data: addToCart,
        };
    }
    catch (error) {
        console.log(`Error occurred while adding book to cart: ${error}`);
        return {
            status: 500,
            message: "Some error occurred!",
        };
    }
});
exports.addBookToCart = addBookToCart;
const removeFromCart = (userName, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield user_1.default.findOne({ where: { userName } });
        if (!checkUser) {
            return {
                status: 403,
                message: "Invalid user access, User not found!",
            };
        }
        const cartItem = yield shoppingcart_1.default.findOne({
            where: { userId: checkUser.id, bookId },
        });
        if (!cartItem) {
            return {
                status: 404,
                message: "Item not found in the cart!",
            };
        }
        yield cartItem.destroy();
        return {
            status: 200,
            message: "Item removed from the cart successfully!",
        };
    }
    catch (error) {
        console.log(`Error occurred while removing item from cart: ${error}`);
        return {
            status: 500,
            message: "Some error occurred!",
        };
    }
});
exports.removeFromCart = removeFromCart;
const updateCartItem = (userName, bookId, newQuantity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield user_1.default.findOne({ where: { userName } });
        if (!checkUser) {
            return {
                status: 403,
                message: "Invalid user access, User not found!",
            };
        }
        const cartItem = yield shoppingcart_1.default.findOne({
            where: { userId: checkUser.id, bookId },
        });
        if (!cartItem) {
            return {
                status: 404,
                message: "Item not found in the cart!",
            };
        }
        if (newQuantity <= 0) {
            return {
                status: 400,
                message: "Quantity should be a positive integer!",
            };
        }
        cartItem.quantity = newQuantity;
        yield cartItem.save();
        return {
            status: 200,
            message: "Cart item updated successfully!",
            data: cartItem,
        };
    }
    catch (error) {
        console.log(`Error occurred while updating cart item: ${error}`);
        return {
            status: 500,
            message: "Some error occurred!",
        };
    }
});
exports.updateCartItem = updateCartItem;
const getCartItems = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield user_1.default.findOne({ where: { userName } });
        if (!checkUser) {
            return {
                status: 403,
                message: "Invalid user access, User not found!",
            };
        }
        const cartItems = yield shoppingcart_1.default.findAll({
            where: { userId: checkUser.id },
            include: [book_1.default],
            order: [["createdAt", "DESC"]],
        });
        const cartData = cartItems.map((item) => ({
            book: item.Book,
            quantity: item.quantity,
        }));
        const currentCost = yield (0, exports.calculateTotal)(userName);
        return {
            status: 200,
            message: "Cart items fetched successfully!",
            data: { cartItems: cartData, total: currentCost },
        };
    }
    catch (error) {
        console.log(`Error occurred while fetching cart items: ${error}`);
        return {
            status: 500,
            message: "Some error occurred!",
        };
    }
});
exports.getCartItems = getCartItems;
const calculateTotal = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield user_1.default.findOne({ where: { userName } });
        if (!checkUser) {
            return {
                status: 403,
                message: "Invalid user access, User not found!",
            };
        }
        const cartItems = yield shoppingcart_1.default.findAll({
            where: { userId: checkUser.id },
            include: [book_1.default],
        });
        let total = 0;
        cartItems.forEach((item) => {
            total += item.quantity * item.Book.price;
        });
        return total;
    }
    catch (error) {
        console.log(`Error occurred while calculating total: ${error}`);
        return {
            status: 500,
            message: "Some error occurred!",
        };
    }
});
exports.calculateTotal = calculateTotal;
