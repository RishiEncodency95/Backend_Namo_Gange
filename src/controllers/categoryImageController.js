import CategoryImage from "../models/CategoryImageModel.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// ✅ CREATE
export const createCategoryImage = async (req, res) => {
  try {
    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "Image required" });

    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "category_images",
    });

    fs.unlinkSync(req.file.path);

    const categoryImage = await CategoryImage.create({
      title: req.body.title,
      category: req.body.category,
      order_by: req.body.order_by,
      status: req.body.status,
      created_by: req.body.created_by,
      image: upload.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "Category Image created",
      categoryImage,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ GET ALL
export const getAllCategoryImages = async (req, res) => {
  try {
    const data = await CategoryImage.find().sort({
      order_by: 1,
      createdAt: -1,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ GET BY ID
export const getCategoryImageById = async (req, res) => {
  try {
    const data = await CategoryImage.findById(req.params.id);
    if (!data)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ UPDATE
export const updateCategoryImage = async (req, res) => {
  try {
    const categoryImage = await CategoryImage.findById(req.params.id);
    if (!categoryImage)
      return res.status(404).json({ success: false, message: "Not found" });

    let newImage = categoryImage.image;

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "category_images",
      });

      newImage = upload.secure_url;
      fs.unlinkSync(req.file.path);
    }

    categoryImage.title = req.body.title || categoryImage.title;
    categoryImage.category = req.body.category || categoryImage.category;
    categoryImage.order_by = req.body.order_by || categoryImage.order_by;
    categoryImage.status = req.body.status || categoryImage.status;
    categoryImage.image = newImage;

    const updated = await categoryImage.save();

    res.status(200).json({
      success: true,
      message: "Category Image updated",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ DELETE
export const deleteCategoryImage = async (req, res) => {
  try {
    const categoryImage = await CategoryImage.findById(req.params.id);
    if (!categoryImage)
      return res.status(404).json({ success: false, message: "Not found" });

    const imgURL = categoryImage.image;
    const publicId = imgURL.split("/").pop().split(".")[0];

    await cloudinary.uploader.destroy(`category_images/${publicId}`);

    await categoryImage.deleteOne();

    res.status(200).json({
      success: true,
      message: "Category Image deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
