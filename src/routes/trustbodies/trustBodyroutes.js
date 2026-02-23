import express from "express";
import upload from "../../utils/multer.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import {
  createTrustBody,
  deleteTrustBody,
  getAllTrustBodies,
  updateTrustBody,
} from "../../controllers/trustbody/trustBodycontroller.js";

const router = express.Router();

// ======================================================
//    ADMIN ROUTES

// Create Trust Body
router.post("/create", upload.single("image"), authMiddleware, createTrustBody);

// Update Trust Body
router.put("/:id", upload.single("image"), authMiddleware, updateTrustBody);

// Delete Trust Body
router.delete("/:id", authMiddleware, deleteTrustBody);

// Get all trust bodies (pagination + filter)
router.get("/", getAllTrustBodies);
router.put("/:id", authMiddleware, upload.single("image"), updateTrustBody);
router.delete("/:id", authMiddleware, deleteTrustBody);

export default router;
