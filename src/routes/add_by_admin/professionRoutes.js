import express from "express";
import {
  createProfession,
  getAllProfessions,
  getProfessionById,
  updateProfession,
  deleteProfession,
} from "../../controllers/add_by_admin/professionController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createProfession);
router.get("/", getAllProfessions);
router.get("/:id", getProfessionById);
router.put("/:id", authMiddleware, updateProfession);
router.delete("/:id", authMiddleware, deleteProfession);

export default router;
