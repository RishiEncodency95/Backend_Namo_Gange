import express from "express";
import {
  createOccupation,
  getAllOccupations,
  getOccupationById,
  updateOccupation,
  deleteOccupation,
} from "../../controllers/add_by_admin/occupationController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createOccupation);
router.get("/", getAllOccupations);
router.get("/:id", getOccupationById);
router.put("/:id", authMiddleware, updateOccupation);
router.delete("/:id", authMiddleware, deleteOccupation);

export default router;
