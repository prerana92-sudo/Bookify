import express from "express";
const router = express.Router();
import {
  addToWishlistController,
  removeFromWishlistController,
  fetchUserWishlistController
} from "../controllers/wishlist.controller";

router.post("/add-to-wishlist", addToWishlistController);
router.delete("/remove-from-wishlist", removeFromWishlistController);
router.get("/fetch-user-wishlist",fetchUserWishlistController);

export default router;
