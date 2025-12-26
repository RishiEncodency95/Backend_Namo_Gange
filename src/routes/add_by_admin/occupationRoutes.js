import express from "express";
import {
  createOccupation,
  getAllOccupations,
  getOccupationById,
  updateOccupation,
  deleteOccupation,
} from "../../controllers/add_by_admin/occupationController.js";

const router = express.Router();

router.post("/create", createOccupation);
router.get("/", getAllOccupations);
router.get("/:id", getOccupationById);
router.put("/:id", updateOccupation);
router.delete("/:id", deleteOccupation);

export default router;
