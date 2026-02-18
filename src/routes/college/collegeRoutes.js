import express from "express";
import {
  createCollege,
  getAllColleges,
  getCollegeById,
  updateCollege,
  deleteCollege,
} from "../../controllers/college/collegeController.js";

const router = express.Router();

router.post("/create", createCollege);
router.get("/", getAllColleges);
router.get("/:id", getCollegeById);
router.put("/:id", updateCollege);
router.delete("/:id", deleteCollege);

export default router;
