import express from "express";
import {
  createBank,
  getAllBanks,
  getBankById,
  updateBank,
  deleteBank,
} from "../../controllers/add_by_admin/bankController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createBank); // CREATE
router.get("/", getAllBanks); // GET ALL
router.get("/:id", getBankById); // GET BY ID
router.put("/:id", authMiddleware, updateBank); // UPDATE
router.delete("/:id", authMiddleware, deleteBank); // DELETE

export default router;
