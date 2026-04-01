import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../../controllers/job/jobController.js";

const router = express.Router();

// CREATE
router.post("/create", createJob);

// GET ALL
router.get("/list", getJobs);

// GET SINGLE
router.get("/:id", getJobById);

// UPDATE
router.put("/update/:id", updateJob);

// DELETE
router.delete("/delete/:id", deleteJob);

export default router;
