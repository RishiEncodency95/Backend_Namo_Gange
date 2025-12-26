import express from "express";
import {
  createDesignation,
  getAllDesignations,
  getDesignationById,
  updateDesignation,
  deleteDesignation,
} from "../../controllers/add_by_admin/designationController.js";

const router = express.Router();

router.post("/", createDesignation);
router.get("/", getAllDesignations);
router.get("/:id", getDesignationById);
router.put("/:id", updateDesignation);
router.delete("/:id", deleteDesignation);

export default router;
