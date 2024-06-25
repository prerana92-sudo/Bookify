import express from "express";
import * as adminUserController from "../controllers/adminusers.controller";
import { verifyAdminAccess } from "../middlewares/auth";

const router = express.Router();

router.post("/add-admin", adminUserController.createAdminUser);
router.get("/list-admins",verifyAdminAccess, adminUserController.getAdminUsers);
router.get("/fetch-admin/:userId",verifyAdminAccess, adminUserController.getAdminUserById);
router.put("/update-admin/:userId", verifyAdminAccess, adminUserController.updateAdminUser);
router.delete("/delete-admin/:userId", verifyAdminAccess, adminUserController.deleteAdminUser);
router.post("/login", adminUserController.loginAdminUser);

export default router;
