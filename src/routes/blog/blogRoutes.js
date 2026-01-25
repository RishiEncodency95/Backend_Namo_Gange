import express from "express";
import upload from "../../utils/multer.js";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../../controllers/blog/blogController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", upload.single("image"), authMiddleware, createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.put("/:id", upload.single("image"), authMiddleware, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

export default router;
