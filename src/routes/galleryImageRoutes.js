import express from "express";
import upload from "../utils/multer.js";
import {
  createGallery,
  getAllGallery,
  getGalleryById,
  updateGallery,
  deleteGallery,
} from "../controllers/galleryImageController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", upload.single("image"), authMiddleware, createGallery);
router.get("/", getAllGallery);
router.get("/:id", getGalleryById);
router.put("/:id", upload.single("image"), authMiddleware, updateGallery);
router.delete("/:id", authMiddleware, deleteGallery);
export default router;
