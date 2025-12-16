import express from "express";
import {
  createStatusOption,
  getStatusOptions,
  getStatusOptionById,
  updateStatusOption,
  deleteStatusOption,
} from "../../controllers/add_by_admin/statusOptionController.js";

const router = express.Router();

router.post("/", createStatusOption); // ➤ Add new
router.get("/", getStatusOptions); // ➤ Get all
router.get("/:id", getStatusOptionById); // ➤ Get one
router.put("/:id", updateStatusOption); // ➤ Update
router.delete("/:id", deleteStatusOption); // ➤ Delete

export default router;
