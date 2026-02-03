import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import {
    createRoleRights,
    getAllRoleRights,
    getRoleRightsById,
    updateRoleRights,
    deleteRoleRights,
} from "../../controllers/role_rights/roleRightsController.js";

const router = express.Router();

router.post("/create", authMiddleware, createRoleRights);
router.get("/", getAllRoleRights);
router.get("/:id", getRoleRightsById);
router.put("/:id", authMiddleware, updateRoleRights);
router.delete("/:id", authMiddleware, deleteRoleRights);

export default router;