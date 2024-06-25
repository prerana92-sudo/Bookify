"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const wishlist_controller_1 = require("../controllers/wishlist.controller");
router.post("/add-to-wishlist", wishlist_controller_1.addToWishlistController);
router.delete("/remove-from-wishlist", wishlist_controller_1.removeFromWishlistController);
router.get("/fetch-user-wishlist", wishlist_controller_1.fetchUserWishlistController);
exports.default = router;
