import express from "express";
import {
  createCoordinatorStatus,
  getAllCoordinatorStatus,
  getCoordinatorStatusById,
  updateCoordinatorStatus,
  deleteCoordinatorStatus,
} from "../../controllers/add_by_admin/coordinatorStatusController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createCoordinatorStatus);
router.get("/", getAllCoordinatorStatus);
router.get("/:id", getCoordinatorStatusById);
router.put("/:id", authMiddleware, updateCoordinatorStatus);
router.delete("/:id", authMiddleware, deleteCoordinatorStatus);

export default router;
