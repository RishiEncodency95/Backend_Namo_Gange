import express from "express";
import upload from "../utils/multer.js";
import {
  createBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
} from "../controllers/bannerController.js";

const router = express.Router();

// Create (POST)
router.post("/create", upload.single("image"), createBanner);

// Read
router.get("/", getAllBanners); // Get all banners
router.get("/:id", getBannerById); // Get single banner

// Update
router.put("/:id", upload.single("image"), updateBanner);

// Delete
router.delete("/:id", deleteBanner);

export default router;
