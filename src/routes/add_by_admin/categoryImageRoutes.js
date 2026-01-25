import express from "express";
import upload from "../../utils/multer.js";
import {
  createCategoryImage,
  getAllCategoryImages,
  getCategoryImageById,
  updateCategoryImage,
  deleteCategoryImage,
} from "../../controllers/add_by_admin/categoryImageController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", upload.single("image"), authMiddleware, createCategoryImage);
router.get("/", getAllCategoryImages);
router.get("/:id", getCategoryImageById);
router.put("/:id", upload.single("image"), authMiddleware, updateCategoryImage);
router.delete("/:id", authMiddleware, deleteCategoryImage);

export default router;
