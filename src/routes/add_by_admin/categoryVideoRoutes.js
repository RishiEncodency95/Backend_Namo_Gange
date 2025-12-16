import express from "express";
import {
  createCategoryVideo,
  getAllCategoryVideos,
  getCategoryVideoById,
  updateCategoryVideo,
  deleteCategoryVideo,
} from "../../controllers/add_by_admin/categoryVideoController.js";

const router = express.Router();

router.post("/create", createCategoryVideo);
router.get("/", getAllCategoryVideos);
router.get("/:id", getCategoryVideoById);
router.put("/:id", updateCategoryVideo);
router.delete("/:id", deleteCategoryVideo);

export default router;
