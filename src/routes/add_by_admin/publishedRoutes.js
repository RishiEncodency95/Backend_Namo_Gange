import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import {
  createPublished,
  getAllPublished,
  updatePublished,
  deletePublished,
} from "../../controllers/add_by_admin/publishedController.js";

const router = express.Router();

router.post("/", authMiddleware, createPublished);
router.get("/", getAllPublished);
router.put("/:id", authMiddleware, updatePublished);
router.delete("/:id", authMiddleware, deletePublished);

export default router;
