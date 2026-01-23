import express from "express";
import upload from "../../utils/multer.js";
import {
  createInitiative,
  getAllInitiatives,
  getInitiativeById,
  updateInitiative,
  deleteInitiative,
} from "../../controllers/initiative/initiativeController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", upload.single("image"),authMiddleware, createInitiative);
router.get("/", getAllInitiatives);
router.get("/:id", getInitiativeById);
router.put("/:id", upload.single("image"),authMiddleware, updateInitiative);
router.delete("/:id",authMiddleware, deleteInitiative);

export default router;
