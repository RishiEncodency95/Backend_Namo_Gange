import express from "express";
import upload from "../../utils/multer.js";
import {
  createObjective,
  getAllObjectives,
  getObjectiveById,
  updateObjective,
  deleteObjective,
} from "../../controllers/objective/objectiveController.js";

const router = express.Router();

router.post("/create", upload.single("image"), createObjective);
router.get("/", getAllObjectives);
router.get("/:id", getObjectiveById);
router.put("/:id", upload.single("image"), updateObjective);
router.delete("/:id", deleteObjective);

export default router;
