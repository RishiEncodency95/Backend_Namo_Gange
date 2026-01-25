import express from "express";
import {
  createFaq,
  getAllFaqs,
  getFaq,
  updateFaq,
  deleteFaq,
  toggleFaqStatus,
} from "../../controllers/faqs/faqcontroller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

/* ADMIN ROUTES */
router.post("/create", authMiddleware, createFaq);
router.put("/:id", authMiddleware, updateFaq);
router.delete("/:id", authMiddleware, deleteFaq);
router.patch("/:id/status", authMiddleware, toggleFaqStatus);

/* PUBLIC ROUTES */
router.get("/", getAllFaqs);
router.get("/:id", getFaq);

export default router;
