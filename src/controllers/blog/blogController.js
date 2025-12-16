import Blog from "../../models/blog/BlogModel.js";
import cloudinary from "../../config/cloudinary.js";
import fs from "fs";

/* ================= CREATE BLOG ================= */
export const createBlog = async (req, res) => {
  try {
    const {
      title,
      slug,
      category,
      meta_keyword,
      meta_description,
      description,
      status,
    } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const exists = await Blog.findOne({ slug });
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "Slug already exists" });
    }

    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "blogs",
    });

    fs.unlinkSync(req.file.path);

    const blog = await Blog.create({
      title,
      slug,
      category,
      meta_keyword,
      meta_description,
      description,
      status,
      image: upload.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================= GET ALL BLOGS ================= */
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================= GET BLOG BY ID ================= */
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================= UPDATE BLOG ================= */
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });

    let imageUrl = blog.image;

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "blogs",
      });
      fs.unlinkSync(req.file.path);
      imageUrl = upload.secure_url;
    }

    blog.title = req.body.title || blog.title;
    blog.slug = req.body.slug || blog.slug;
    blog.category = req.body.category || blog.category;
    blog.meta_keyword = req.body.meta_keyword || blog.meta_keyword;
    blog.meta_description = req.body.meta_description || blog.meta_description;
    blog.description = req.body.description || blog.description;
    blog.status = req.body.status || blog.status;
    blog.image = imageUrl;

    const updated = await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================= DELETE BLOG ================= */
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });

    const publicId = blog.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`blogs/${publicId}`);

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
