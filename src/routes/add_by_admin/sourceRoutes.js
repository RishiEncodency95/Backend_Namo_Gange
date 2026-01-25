import express from "express";
import {
  createSource,
  getAllSources,
  getSourceById,
  updateSource,
  deleteSource,
} from "../../controllers/add_by_admin/sourceController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createSource);
router.get("/", getAllSources);
router.get("/:id", getSourceById);
router.put("/:id", authMiddleware, updateSource);
router.delete("/:id", authMiddleware, deleteSource);

export default router;
