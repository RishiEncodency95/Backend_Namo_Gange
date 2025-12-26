import express from "express";
import {
  createData,
  getAllData,
  getDataById,
  updateData,
  deleteData,
} from "../../controllers/add_by_admin/dataController.js";

const router = express.Router();

router.post("/", createData);        // CREATE
router.get("/", getAllData);         // GET ALL
router.get("/:id", getDataById);     // GET BY ID
router.put("/:id", updateData);      // UPDATE
router.delete("/:id", deleteData);   // DELETE

export default router;
