import express from "express";
import {
  createObjName,
  getAllObjNames,
  getObjNameById,
  updateObjName,
  deleteObjName,
} from "../../controllers/add_by_admin/objNameController.js";

const router = express.Router();

router.post("/create", createObjName);
router.get("/", getAllObjNames);
router.get("/:id", getObjNameById);
router.put("/:id", updateObjName);
router.delete("/:id", deleteObjName);

export default router;
