import express from "express";
const router = express.Router();
import {
  addToCartController,
  removeFromCartController,
  updateCartItemController,
  getCartItemsController,
} from "../controllers/cart.contrroller";

router.post("/add-to-cart", addToCartController);
router.post("/remove-from-cart", removeFromCartController);
router.post("/update-cart-item", updateCartItemController);
router.get("/get-cart-items", getCartItemsController);

export default router;
