import express from "express";
import upload from "../../utils/multer.js";
import {
  createBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
} from "../../controllers/home_banner/bannerController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Create (POST)
router.post("/create", upload.single("image"), authMiddleware, createBanner);

// Read
router.get("/", getAllBanners); // Get all banners
router.get("/:id", getBannerById); // Get single banner

// Update
router.put("/:id", upload.single("image"), authMiddleware, updateBanner);

// Delete
router.delete("/:id", authMiddleware, deleteBanner);

export default router;
