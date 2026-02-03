import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import {
    createSidebar,
    getAllSidebars,
    getSidebarById,
    updateSidebar,
    deleteSidebar,
} from "../../controllers/add_by_admin/sidebarController.js";

const router = express.Router();

router.post("/create", authMiddleware, createSidebar);
router.get("/", getAllSidebars);
router.get("/:id", getSidebarById);
router.put("/:id", authMiddleware, updateSidebar);
router.delete("/:id", authMiddleware, deleteSidebar);

export default router;