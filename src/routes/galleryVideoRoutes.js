import express from "express";
import {
  createGalleryVideo,
  getAllGalleryVideos,
  getGalleryVideoById,
  updateGalleryVideo,
  deleteGalleryVideo,
} from "../controllers/galleryVideoController.js";

const router = express.Router();

router.post("/create", createGalleryVideo);
router.get("/", getAllGalleryVideos);
router.get("/:id", getGalleryVideoById);
router.put("/:id", updateGalleryVideo);
router.delete("/:id", deleteGalleryVideo);

export default router;
