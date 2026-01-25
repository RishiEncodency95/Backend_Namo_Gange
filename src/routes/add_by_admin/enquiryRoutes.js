import express from "express";
import {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} from "../../controllers/add_by_admin/enquiryController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createEnquiry);
router.get("/", getAllEnquiries);
router.get("/:id", getEnquiryById);
router.put("/:id", authMiddleware, updateEnquiry);
router.delete("/:id", authMiddleware, deleteEnquiry);

export default router;
