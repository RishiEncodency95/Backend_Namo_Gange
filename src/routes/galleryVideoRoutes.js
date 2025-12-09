import express from "express";
import upload from "../utils/multer.js";
import {
  createGalleryVideo,
  getAllGalleryVideos,
  getGalleryVideoById,
  updateGalleryVideo,
  deleteGalleryVideo,
} from "../controllers/galleryVideoController.js";

const router = express.Router();

router.post("/create", upload.single("video"), createGalleryVideo);
router.get("/", getAllGalleryVideos);
router.get("/:id", getGalleryVideoById);
router.put("/:id", upload.single("video"), updateGalleryVideo);
router.delete("/:id", deleteGalleryVideo);

export default router;
