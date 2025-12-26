import express from "express";
import {
  createUniversity,
  getAllUniversities,
  getUniversityById,
  updateUniversity,
  deleteUniversity,
} from "../../controllers/add_by_admin/universityController.js";

const router = express.Router();

router.post("/", createUniversity); // CREATE
router.get("/", getAllUniversities); // GET ALL
router.get("/:id", getUniversityById); // GET BY ID
router.put("/:id", updateUniversity); // UPDATE
router.delete("/:id", deleteUniversity); // DELETE

export default router;
