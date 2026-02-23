import express from "express";
import upload from "../../utils/multer.js";
import {
  createAchievement,
  getAllAchievements,
  getAchievementById,
  updateAchievement,
  deleteAchievement,
} from "../../controllers/achievement/achievementController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  upload.single("image"),
  authMiddleware,
  createAchievement,
);
router.get("/", getAllAchievements);
router.get("/:id", getAchievementById);
router.put("/:id", upload.single("image"), authMiddleware, updateAchievement);
router.delete("/:id", authMiddleware, deleteAchievement);

export default router;
