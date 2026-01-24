import express from "express";
import {
  createStatusOption,
  getAllStatusOptions,
  getStatusOptionById,
  updateStatusOption,
  deleteStatusOption,
} from "../../controllers/add_by_admin/statusOptionController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createStatusOption);
router.get("/", getAllStatusOptions);
router.get("/:id", getStatusOptionById);
router.put("/:id", authMiddleware, updateStatusOption);
router.delete("/:id", authMiddleware, deleteStatusOption);

export default router;
