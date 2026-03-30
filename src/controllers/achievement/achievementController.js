import Achievement from "../../models/achievement/achievementModel.js";
import cloudinary from "../../config/cloudinary.js";

/* ===============================
   HELPERS
================================ */
const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "achievements" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });

const deleteFromCloudinary = async (url) => {
  if (!url) return;
  const publicId = url.split("/").pop().split(".")[0];
  await cloudinary.uploader.destroy(`achievements/${publicId}`);
};
/* ===============================
   CREATE ACHIEVEMENT
================================ */
export const createAchievement = async (req, res) => {
  try {
    const {
      title,
      slug,
      desc,
      link,
      image_alt,
      status,
      created_by,
    } = req.body;

    if (!title || !slug || !desc || !created_by || !req.file) {
      return res.status(400).json({
        success: false,
        message: "title, slug, desc, image and created_by are required",
      });
    }

    const exists = await Achievement.findOne({ slug });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Slug already exists",
      });
    }

    // upload image to cloudinary
    const uploadResult = await uploadToCloudinary(req.file.buffer);

    const data = await Achievement.create({
      title,
      slug,
      desc,
      link,
      image: uploadResult.secure_url,
      image_alt,
     
      status,
      created_by,
    });

    res.status(201).json({
      success: true,
      message: "Achievement created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   GET ALL ACHIEVEMENTS
================================ */
export const getAllAchievements = async (req, res) => {
  try {
    const data = await Achievement.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===============================
   GET ACHIEVEMENT BY ID
================================ */
export const getAchievementById = async (req, res) => {
  try {
    const data = await Achievement.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===============================
   UPDATE ACHIEVEMENT
================================ */
export const updateAchievement = async (req, res) => {
  try {
    const data = await Achievement.findById(req.params.id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    if (req.body.slug && req.body.slug !== data.slug) {
      const existingSlug = await Achievement.findOne({ slug: req.body.slug });
      if (existingSlug) {
        return res
          .status(409)
          .json({ success: false, message: "Slug already exists" });
      }
    }

    let imageUrl = data.image;
    if (req.file) {
      await deleteFromCloudinary(data.image);
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    }

    data.title = req.body.title || data.title;
    data.slug = req.body.slug || data.slug;
    data.desc = req.body.desc || data.desc;
    data.link = req.body.link ?? data.link;
    data.image = imageUrl;
    data.image_alt = req.body.image_alt ?? data.image_alt;
    data.status = req.body.status || data.status;
    data.updated_by = req.body.updated_by || data.updated_by;

    const updatedData = await data.save();

    res.status(200).json({
      success: true,
      message: "Achievement updated successfully",
      data: updatedData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===============================
   DELETE ACHIEVEMENT
================================ */
export const deleteAchievement = async (req, res) => {
  try {
    const data = await Achievement.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    await deleteFromCloudinary(data.image);
    await data.deleteOne();

    res.status(200).json({
      success: true,
      message: "Achievement deleted successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
