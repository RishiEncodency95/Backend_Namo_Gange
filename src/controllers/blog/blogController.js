import Blog from "../../models/blog/BlogModel.js";
import cloudinary from "../../config/cloudinary.js";
import slugify from "slugify";

/* ================= CLOUDINARY HELPER ================= */
const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "blogs" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });

const deleteFromCloudinary = async (url) => {
  if (!url) return;
  const publicId = url.split("/").pop().split(".")[0];
  await cloudinary.uploader.destroy(`blogs/${publicId}`);
};

/* ================= CREATE BLOG ================= */
export const createBlog = async (req, res) => {
  try {
    const {
      title,
      category,
      author,
      description,
      status,
      createdBy,
      updatedBy,
      image_alt,
      slug: inputSlug,
    } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    let slug = inputSlug || title;
    slug = slugify(slug, { lower: true, strict: true });
    const exists = await Blog.findOne({ slug });
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "Slug already exists" });
    }

    const upload = await uploadToCloudinary(req.file.buffer);

    const blog = await Blog.create({
      title,
      slug,
      category,
      author,
      description,
      status,
      createdBy,
      updatedBy,
      image: upload.secure_url,
      image_alt: image_alt || "",
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

    if (req.body.slug && req.body.slug !== blog.slug) {
      const newSlug = slugify(req.body.slug, { lower: true, strict: true });
      const exists = await Blog.findOne({ slug: newSlug });
      if (exists) {
        return res
          .status(409)
          .json({ success: false, message: "Slug already exists" });
      }
      blog.slug = newSlug;
    }

    let imageUrl = blog.image;

    if (req.file) {
      await deleteFromCloudinary(blog.image);
      const upload = await uploadToCloudinary(req.file.buffer);
      imageUrl = upload.secure_url;
    }

    blog.title = req.body.title || blog.title;
    blog.category = req.body.category || blog.category;
    blog.author = req.body.author || blog.author;
    blog.description = req.body.description || blog.description;
    blog.status = req.body.status || blog.status;
    blog.image = imageUrl;
    blog.image_alt = req.body.image_alt ?? blog.image_alt;
    blog.createdBy = req.body.createdBy || blog.createdBy;
    blog.updatedBy = req.body.updatedBy || blog.updatedBy;

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

    await deleteFromCloudinary(blog.image);

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
