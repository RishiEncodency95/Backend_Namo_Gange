import express from "express";
import {
  createGalleryVideo,
  getAllGalleryVideos,
  getGalleryVideoById,
  updateGalleryVideo,
  deleteGalleryVideo,
} from "../controllers/galleryVideoController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createGalleryVideo);
router.get("/", getAllGalleryVideos);
router.get("/:id", getGalleryVideoById);
router.put("/:id", authMiddleware, updateGalleryVideo);
router.delete("/:id", authMiddleware, deleteGalleryVideo);
export default router;
