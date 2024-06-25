import express from "express";
const router = express.Router();
import { verifyAccess, verifyAdminAccess } from "../middlewares/auth";

import {
  addUser,
  getUserList,
  getUserData,
  updateUserData,
  deleteUserData,
  loginUser,
  addUserAddressController,
  fetchUserAddressesController
} from "../controllers/user.controller";

router.post("/add-user", addUser);
router.get("/get-all-users", verifyAdminAccess, getUserList);
router.get("/get-user-data/:userId", getUserData);
router.patch("/update-user-data/:userId", updateUserData);
router.delete("/delete-user/:userId", deleteUserData);
router.post("/login",loginUser);

router.post("/add-address",verifyAccess, addUserAddressController);
router.get("/get-user-addresses", verifyAccess,fetchUserAddressesController);


export default router;