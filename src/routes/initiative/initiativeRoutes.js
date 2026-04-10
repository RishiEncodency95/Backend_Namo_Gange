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

router.post(
  "/create",
  upload.fields([{ name: "image", maxCount: 1 }, { name: "pages_images" }]),
  authMiddleware,
  createInitiative
);
router.get("/", getAllInitiatives);
router.get("/:id", getInitiativeById);
router.put(
  "/:id",
  upload.fields([{ name: "image", maxCount: 1 }, { name: "pages_images" }]),
  authMiddleware,
  updateInitiative
);
router.delete("/:id", authMiddleware, deleteInitiative);

export default router;
