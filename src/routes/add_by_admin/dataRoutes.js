import express from "express";
import {
  createData,
  getAllData,
  getDataById,
  updateData,
  deleteData,
} from "../../controllers/add_by_admin/dataController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/craete", authMiddleware, createData); // CREATE
router.get("/", getAllData); // GET ALL
router.get("/:id", getDataById); // GET BY ID
router.put("/:id", authMiddleware, updateData); // UPDATE
router.delete("/:id", authMiddleware, deleteData); // DELETE

export default router;
