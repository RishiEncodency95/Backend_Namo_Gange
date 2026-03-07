import express from "express";
import upload from "../../utils/multer.js";
import {
  createSeoCode,
  getAllSeoCode,
  getSeoCodeById,
  updateSeoCode,
  deleteSeoCode,
} from "../../controllers/seo/seoCodeController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

const uploadFields = upload.fields([
  { name: "google_search_console", maxCount: 1 },
  { name: "report", maxCount: 1 },
  { name: "sitemap", maxCount: 1 },
]);

// Create
router.post("/create", authMiddleware, uploadFields, createSeoCode);

// Read
router.get("/", getAllSeoCode);
router.get("/:id", getSeoCodeById);

// Update
router.put("/:id", authMiddleware, uploadFields, updateSeoCode);

// Delete
router.delete("/:id", authMiddleware, deleteSeoCode);

export default router;
