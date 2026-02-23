import express from "express";
import upload from "../../utils/multer.js";
import {
  createHero,
  getAllHeroes,
  getHeroById,
  updateHero,
  deleteHero,
} from "../../controllers/hero/heroController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Create (POST)
router.post("/create", upload.single("image"), authMiddleware, createHero);

// Read
router.get("/", getAllHeroes); // Get all heroes
router.get("/:id", getHeroById); // Get single hero

// Update
router.put("/:id", upload.single("image"), authMiddleware, updateHero);

// Delete
router.delete("/:id", authMiddleware, deleteHero);

export default router;
