import express from "express";
import upload from "../utils/multer.js";
import {
  createCategoryImage,
  getAllCategoryImages,
  getCategoryImageById,
  updateCategoryImage,
  deleteCategoryImage,
} from "../controllers/categoryImageController.js";

const router = express.Router();

router.post("/create", upload.single("image"), createCategoryImage);
router.get("/", getAllCategoryImages);
router.get("/:id", getCategoryImageById);
router.put("/:id", upload.single("image"), updateCategoryImage);
router.delete("/:id", deleteCategoryImage);

export default router;
