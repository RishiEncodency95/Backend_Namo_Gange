import express from "express";
import {
  createUniversity,
  getAllUniversities,
  getUniversityById,
  updateUniversity,
  deleteUniversity,
} from "../../controllers/add_by_admin/universityController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createUniversity);
router.get("/", getAllUniversities);
router.get("/:id", getUniversityById);
router.put("/:id", authMiddleware, updateUniversity);
router.delete("/:id", authMiddleware, deleteUniversity);

export default router;
