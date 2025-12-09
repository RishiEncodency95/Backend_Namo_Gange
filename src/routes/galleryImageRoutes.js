import express from "express";
import upload from "../utils/multer.js";
import {
  createGallery,
  getAllGallery,
  getGalleryById,
  updateGallery,
  deleteGallery,
} from "../controllers/galleryImageController.js";

const router = express.Router();

router.post("/create", upload.single("image"), createGallery);
router.get("/", getAllGallery);
router.get("/:id", getGalleryById);
router.put("/:id", upload.single("image"), updateGallery);
router.delete("/:id", deleteGallery);

export default router;
