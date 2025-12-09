import GalleryVideo from "../models/GalleryVideoModel.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// ---------------- CREATE ----------------
export const createGalleryVideo = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ success: false, message: "Video file missing" });

    const upload = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      folder: "gallery_videos",
    });

    fs.unlinkSync(req.file.path);

    const video = await GalleryVideo.create({
      title: req.body.title,
      category: req.body.category,
      date: req.body.date,
      location: req.body.location,
      status: req.body.status,
      orderBy: req.body.orderBy,
      createdBy: req.body.createdBy,
      video: upload.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "Gallery video added",
      video,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ---------------- GET ALL ----------------
export const getAllGalleryVideos = async (req, res) => {
  try {
    const videos = await GalleryVideo.find().sort({
      orderBy: 1,
      createdAt: -1,
    });

    res.status(200).json({ success: true, videos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ---------------- GET BY ID ----------------
export const getGalleryVideoById = async (req, res) => {
  try {
    const video = await GalleryVideo.findById(req.params.id);
    if (!video)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, video });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ---------------- UPDATE ----------------
export const updateGalleryVideo = async (req, res) => {
  try {
    const video = await GalleryVideo.findById(req.params.id);
    if (!video)
      return res.status(404).json({ success: false, message: "Not found" });

    let newVideo = video.video;

    // If new video uploaded
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "video",
        folder: "gallery_videos",
      });

      newVideo = upload.secure_url;

      fs.unlinkSync(req.file.path);
    }

    video.title = req.body.title || video.title;
    video.category = req.body.category || video.category;
    video.date = req.body.date || video.date;
    video.location = req.body.location || video.location;
    video.status = req.body.status || video.status;
    video.orderBy = req.body.orderBy || video.orderBy;
    video.video = newVideo;

    const updated = await video.save();

    res.status(200).json({
      success: true,
      message: "Gallery video updated",
      video: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ---------------- DELETE ----------------
export const deleteGalleryVideo = async (req, res) => {
  try {
    const video = await GalleryVideo.findById(req.params.id);
    if (!video)
      return res.status(404).json({ success: false, message: "Not found" });

    const videoURL = video.video;
    const publicId = videoURL.split("/").pop().split(".")[0];

    await cloudinary.uploader.destroy(`gallery_videos/${publicId}`, {
      resource_type: "video",
    });

    await video.deleteOne();

    res.status(200).json({
      success: true,
      message: "Gallery video deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
