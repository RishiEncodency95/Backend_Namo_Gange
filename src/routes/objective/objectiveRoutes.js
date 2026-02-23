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

router.post(
  "/create",
  authMiddleware,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  createObjective,
);
router.get("/", getAllObjectives);
router.get("/:id", getObjectiveById);
router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  authMiddleware,
  updateObjective,
);
router.delete("/:id", authMiddleware, deleteObjective);

export default router;
