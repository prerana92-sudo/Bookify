"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = require("../middlewares/auth");
const purchase_controller_1 = require("../controllers/purchase.controller");
router.post("/add-purchase", auth_1.setLoggedInUserLangInReq, purchase_controller_1.addPurchaseController);
router.get("/get-user-purchase-history", purchase_controller_1.fetchUserPurchaseHistoryController);
router.get("/search-purchase-record", purchase_controller_1.searchPurchaseDataController);
exports.default = router;
