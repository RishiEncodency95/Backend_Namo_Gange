import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import {
    createRole,
    getAllRoles,
    updateRole,
    deleteRole,
} from "../../controllers/add_by_admin/roleController.js";

const router = express.Router();

router.post("/create", authMiddleware, createRole);
router.get("/", getAllRoles);
router.put("/:id", authMiddleware, updateRole);
router.delete("/:id", authMiddleware, deleteRole);

export default router;