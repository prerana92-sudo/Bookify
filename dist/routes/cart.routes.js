"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const cart_contrroller_1 = require("../controllers/cart.contrroller");
router.post("/add-to-cart", cart_contrroller_1.addToCartController);
router.post("/remove-from-cart", cart_contrroller_1.removeFromCartController);
router.post("/update-cart-item", cart_contrroller_1.updateCartItemController);
router.get("/get-cart-items", cart_contrroller_1.getCartItemsController);
exports.default = router;
