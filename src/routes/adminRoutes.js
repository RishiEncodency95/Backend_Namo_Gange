import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
} from "../controllers/adminController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

router.get("/", protect, authorizeRoles("superadmin", "admin"), getAllAdmins);
router.get("/:id", protect, authorizeRoles("superadmin", "admin"), getAdminById);

router.put("/:id", protect, authorizeRoles("superadmin", "admin"), updateAdmin);

router.delete("/:id", protect, authorizeRoles("superadmin"), deleteAdmin);

export default router;
