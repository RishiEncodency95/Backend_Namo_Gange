import express from "express";
import upload from "../../utils/multer.js";
import {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} from "../../controllers/testimonial/testimonialController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", upload.single("image"), authMiddleware, createTestimonial);
router.get("/", getAllTestimonials);
router.get("/:id", getTestimonialById);
router.put("/:id", upload.single("image"), authMiddleware, updateTestimonial);
router.delete("/:id", authMiddleware, deleteTestimonial);

export default router;
