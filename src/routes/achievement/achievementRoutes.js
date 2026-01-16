import express from "express";
import upload from "../../utils/multer.js";
import {
  createAchievement,
  getAllAchievements,
  getAchievementById,
  updateAchievement,
  deleteAchievement,
} from "../../controllers/achievement/achievementController.js";

const router = express.Router();

router.post("/create", upload.single("image"), createAchievement);
router.get("/", getAllAchievements);
router.get("/:id", getAchievementById);
router.put("/:id", upload.single("image"), updateAchievement);
router.delete("/:id", deleteAchievement);

export default router;
