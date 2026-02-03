import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import {
    createIP,
    getAllIPs,
    updateIP,
    deleteIP,
} from "../../controllers/add_by_admin/ipController.js";

const router = express.Router();

router.post("/create", authMiddleware, createIP);
router.get("/", getAllIPs);
router.put("/:id", authMiddleware, updateIP);
router.delete("/:id", authMiddleware, deleteIP);

export default router;