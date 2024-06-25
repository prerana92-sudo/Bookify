import express from "express";
const router = express.Router();
import {setLoggedInUserLangInReq} from '../middlewares/auth';
import {
  addPurchaseController,
  fetchUserPurchaseHistoryController,
  searchPurchaseDataController
} from "../controllers/purchase.controller";

router.post("/add-purchase",setLoggedInUserLangInReq, addPurchaseController);
router.get("/get-user-purchase-history", fetchUserPurchaseHistoryController);
router.get("/search-purchase-record", searchPurchaseDataController)

export default router;