import express from "express";
import upload from "../../utils/multer.js";
import {
  createSeo,
  getAllSeo,
  getSeoByPath,
  getSeoById,
  updateSeo,
  deleteSeo,
} from "../../controllers/seo/seo.controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Create - with file uploads
router.post(
  "/create",
  authMiddleware,
  upload.fields([
    { name: "page_banner", maxCount: 1 },
    { name: "open_graph", maxCount: 1 },
  ]),
  createSeo,
);

// Read
router.get("/", getAllSeo);
router.get("/page/:path", getSeoByPath);
router.get("/:id", getSeoById);

// Update - with file uploads
router.put(
  "/:id",
  authMiddleware,
  upload.fields([
    { name: "page_banner", maxCount: 1 },
    { name: "open_graph", maxCount: 1 },
  ]),
  updateSeo,
);

// Delete
router.delete("/:id", authMiddleware, deleteSeo);

export default router;
