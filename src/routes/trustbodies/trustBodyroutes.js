import express from "express";
import upload from "../../utils/multer.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import {
  createTrustBody,
  getAllTrustBodies,
  updateTrustBody,
  deleteTrustBody,
} from "../../controllers/trustbody/trustBodyController.js";

const router = express.Router();

router.post("/create", authMiddleware, upload.single("image"), createTrustBody);
router.get("/", getAllTrustBodies);
router.put("/:id", authMiddleware, upload.single("image"), updateTrustBody);
router.delete("/:id", authMiddleware, deleteTrustBody);

export default router;
