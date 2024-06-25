"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = require("../middlewares/auth");
const user_controller_1 = require("../controllers/user.controller");
router.post("/add-user", user_controller_1.addUser);
router.get("/get-all-users", auth_1.verifyAdminAccess, user_controller_1.getUserList);
router.get("/get-user-data/:userId", user_controller_1.getUserData);
router.patch("/update-user-data/:userId", user_controller_1.updateUserData);
router.delete("/delete-user/:userId", user_controller_1.deleteUserData);
router.post("/login", user_controller_1.loginUser);
router.post("/add-address", auth_1.verifyAccess, user_controller_1.addUserAddressController);
router.get("/get-user-addresses", auth_1.verifyAccess, user_controller_1.fetchUserAddressesController);
exports.default = router;
