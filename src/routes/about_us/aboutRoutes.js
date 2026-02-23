import express from "express";
import upload from "../../utils/multer.js";
import {
  createAbout,
  getAllAbouts,
  getAboutById,
  updateAbout,
  deleteAbout,
} from "../../controllers/about_us/aboutController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Create (POST)
router.post("/create", authMiddleware, upload.single("image"), createAbout);

// Read
router.get("/", getAllAbouts);
router.get("/:id", getAboutById);

// Update
router.put("/:id", authMiddleware, upload.single("image"), updateAbout);

// Delete
router.delete("/:id", authMiddleware, deleteAbout);

export default router;
