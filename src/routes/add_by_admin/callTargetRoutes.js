import express from "express";
import {
  createCallTarget,
  getAllCallTargets,
  getCallTargetById,
  updateCallTarget,
  deleteCallTarget,
} from "../../controllers/add_by_admin/callTargetController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createCallTarget);
router.get("/", getAllCallTargets);
router.get("/:id", getCallTargetById);
router.put("/:id", authMiddleware, updateCallTarget);
router.delete("/:id", authMiddleware, deleteCallTarget);

export default router;
