import express from "express";
import {
  createAgsPayment,
  getAllAgsPayments,
  getAgsPaymentById,
  updateAgsPayment,
  deleteAgsPayment,
    previewRegistrationNo,
} from "../../controllers/ags/agsPayment.controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createAgsPayment);
router.get("/preview-registration", authMiddleware, previewRegistrationNo);
router.get("/", getAllAgsPayments);
router.get("/:id", getAgsPaymentById);
router.put("/:id", authMiddleware, updateAgsPayment);
router.delete("/:id", authMiddleware, deleteAgsPayment);

export default router;
