import Banner from "../models/BannerModel.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const createBanner = async (req, res) => {
  try {
    console.log("DEBUG: req.file =", req.file);
    console.log("DEBUG: req.body =", req.body);

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image file missing" });
    }

    // Upload file path to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "namo_gange",
    });

    console.log("DEBUG: cloudinary upload result:", uploadResult);

    const banner = await Banner.create({
      title: req.body.title,
      link: req.body.link,
      image: uploadResult.secure_url,
      status: req.body.status,
    });

    // delete local file if exists
    try {
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    } catch (e) {
      console.warn("Warning: failed to remove temp file:", e.message);
    }

    return res
      .status(201)
      .json({ success: true, message: "Banner created", banner });
  } catch (err) {
    console.error("UPLOAD ERROR FULL:", err);
    // send full error back so we know exact cause
    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};
// ---------------- GET ALL -----------------
export const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, banners });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ---------------- GET BY ID -----------------
export const getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }
    res.status(200).json({ success: true, banner });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ---------------- UPDATE -----------------
export const updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }

    let updatedImage = banner.image;

    // If user uploaded a new image
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "namo_gange",
      });
      updatedImage = uploadResult.secure_url;
      fs.unlinkSync(req.file.path);
    }

    banner.title = req.body.title || banner.title;
    banner.link = req.body.link || banner.link;
    banner.image = updatedImage;
    banner.status = req.body.status || banner.status;

    const updated = await banner.save();

    res
      .status(200)
      .json({ success: true, message: "Banner updated", banner: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ---------------- DELETE -----------------
export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }

    // Extract Cloudinary public_id from URL
    const imgURL = banner.image;
    const publicId = imgURL.split("/").pop().split(".")[0];

    await cloudinary.uploader.destroy(`namo_gange/${publicId}`);

    await banner.deleteOne();

    res.status(200).json({ success: true, message: "Banner deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
