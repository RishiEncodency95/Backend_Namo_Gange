import express from "express";
import {
  createJobApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
} from "../../controllers/job/jobApplyController.js";

const router = express.Router();

// CREATE
router.post("/create", createJobApplication);

// GET ALL
router.get("/list", getAllApplications);

// GET SINGLE
router.get("/:id", getApplicationById);

// UPDATE
router.put("/update/:id", updateApplication);

// DELETE
router.delete("/delete/:id", deleteApplication);

export default router;
