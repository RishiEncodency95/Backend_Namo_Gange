import GalleryImage from "../models/GalleryImageModel.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// ---------------- CREATE ----------------
export const createGallery = async (req, res) => {
  try {
    const { title, category, date, location, createdBy } = req.body;
    if (!req.file)
      return res.status(400).json({ success: false, message: "Image missing" });

    const upload = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "gallery_images" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(req.file.buffer);
    });
    const galleryImage = await GalleryImage.create({
      title: req.body.title,
      category: req.body.category,
      date: req.body.date,
      location: req.body.location,
      status: req.body.status,
      orderBy: req.body.orderBy,
      createdBy: req.body.createdBy,
      image: upload.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "Gallery image added",
      gallery: galleryImage,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ---------------- GET ALL ----------------
export const getAllGallery = async (req, res) => {
  try {
    const gallery = await GalleryImage.find().sort({
      orderBy: 1,
      createdAt: -1,
    });

    res.status(200).json({ success: true, gallery });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ---------------- GET BY ID ----------------
export const getGalleryById = async (req, res) => {
  try {
    const gallery = await GalleryImage.findById(req.params.id);
    if (!gallery)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, gallery });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ---------------- UPDATE ----------------
export const updateGallery = async (req, res) => {
  try {
    const gallery = await GalleryImage.findById(req.params.id);
    if (!gallery)
      return res.status(404).json({ success: false, message: "Not found" });

    let newImage = gallery.image;

    // if new image uploaded
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "gallery_images",
      });

      newImage = upload.secure_url;
      fs.unlinkSync(req.file.path);
    }

    gallery.title = req.body.title || gallery.title;
    gallery.category = req.body.category || gallery.category;
    gallery.date = req.body.date || gallery.date;
    gallery.location = req.body.location || gallery.location;
    gallery.status = req.body.status || gallery.status;
    gallery.orderBy = req.body.orderBy || gallery.orderBy;
    gallery.image = newImage;

    const updated = await gallery.save();

    res.status(200).json({
      success: true,
      message: "Gallery updated",
      gallery: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ---------------- DELETE ----------------
export const deleteGallery = async (req, res) => {
  try {
    const gallery = await GalleryImage.findById(req.params.id);
    if (!gallery)
      return res.status(404).json({ success: false, message: "Not found" });

    const imgURL = gallery.image;
    const publicId = imgURL.split("/").pop().split(".")[0];

    await cloudinary.uploader.destroy(`gallery_images/${publicId}`);

    await gallery.deleteOne();

    res.status(200).json({
      success: true,
      message: "Gallery deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
