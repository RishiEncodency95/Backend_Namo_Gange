import express from "express";
import {
    createSupport,
    getAllSupports,
    getSupportById,
    updateSupport,
    deleteSupport,
} from "../../controllers/support/supportController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createSupport);
router.get("/", getAllSupports);
router.get("/:id", getSupportById);
router.put("/:id", authMiddleware, updateSupport);
router.delete("/:id", authMiddleware, deleteSupport);

export default router;