import express from "express";
import {
  createTrustBody,
  getAllTrustBodies,
  getTrustBody,
  updateTrustBody,
  deleteTrustBody,
  toggleTrustBodyStatus,
} from "../../controllers/trustbody/trustBodycontroller.js";

import upload from "../../utils/multer.js"; // multer middleware
import authMiddleware from "../../middlewares/authMiddleware.js"; // optional admin auth

const router = express.Router();

/* ======================================================
   ADMIN ROUTES
====================================================== */

// Create Trust Body
router.post(
  "/",
  upload.single("image"),
  authMiddleware,
  createTrustBody
);

// Update Trust Body
router.put(
  "/:id",
  upload.single("image"),
  authMiddleware,
  updateTrustBody
);

// Delete Trust Body
router.delete(
  "/:id",
  authMiddleware,
  deleteTrustBody
);

// Toggle Active / Inactive
router.patch(
  "/:id/status",
  authMiddleware,
  toggleTrustBodyStatus
);

/* ======================================================
   PUBLIC ROUTES
====================================================== */

// Get all trust bodies (pagination + filter)
router.get("/", getAllTrustBodies);

// Get single trust body (by ID or slug)
router.get("/:id", getTrustBody);

export default router;
