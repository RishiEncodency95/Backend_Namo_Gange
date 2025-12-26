import express from "express";
import {
  createProfession,
  getAllProfessions,
  getProfessionById,
  updateProfession,
  deleteProfession,
} from "../../controllers/add_by_admin/professionController.js";

const router = express.Router();

router.post("/", createProfession);
router.get("/", getAllProfessions);
router.get("/:id", getProfessionById);
router.put("/:id", updateProfession);
router.delete("/:id", deleteProfession);

export default router;
