import express from "express";
import {
    createSupport,
    getAllSupports,
    getSupportById,
    updateSupport,
    deleteSupport,
} from "../../controllers/support/supportController.js";

const router = express.Router();

router.post("/create", createSupport);
router.get("/", getAllSupports);
router.get("/:id", getSupportById);
router.put("/:id", updateSupport);
router.delete("/:id", deleteSupport);

export default router;