import express from "express";
import upload from "../../utils/multer.js";
import {
  createInitiative,
  getAllInitiatives,
  getInitiativeById,
  updateInitiative,
  deleteInitiative,
} from "../../controllers/initiative/initiativeController.js";

const router = express.Router();

router.post("/create", upload.single("image"), createInitiative);
router.get("/", getAllInitiatives);
router.get("/:id", getInitiativeById);
router.put("/:id", upload.single("image"), updateInitiative);
router.delete("/:id", deleteInitiative);

export default router;
