import express from "express";
import {
  createDesignation,
  getAllDesignations,
  getDesignationById,
  updateDesignation,
  deleteDesignation,
} from "../../controllers/add_by_admin/designationController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createDesignation);
router.get("/", getAllDesignations);
router.get("/:id", getDesignationById);
router.put("/:id", authMiddleware, updateDesignation);
router.delete("/:id", authMiddleware, deleteDesignation);

export default router;
