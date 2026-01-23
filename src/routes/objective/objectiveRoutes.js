import express from "express";
import upload from "../../utils/multer.js";
import {
  createObjective,
  getAllObjectives,
  getObjectiveById,
  updateObjective,
  deleteObjective,
} from "../../controllers/objective/objectiveController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", upload.single("image"), authMiddleware, createObjective);
router.get("/", getAllObjectives);
router.get("/:id", getObjectiveById);
router.put("/:id", upload.single("image"), authMiddleware, updateObjective);
router.delete("/:id", authMiddleware, deleteObjective);

export default router;
