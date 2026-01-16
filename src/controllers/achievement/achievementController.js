import Achievement from "../../models/achievement/achievementModel.js";
import cloudinary from "../../config/cloudinary.js";

/* ===============================
   CREATE ACHIEVEMENT
================================ */
export const createAchievement = async (req, res) => {
  try {
    const { title, slug, desc, meta_tag, meta_desc, created_by } = req.body;

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
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "achievements" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(req.file.buffer);
    });

    const data = await Achievement.create({
      title,
      slug,
      desc,
      image: uploadResult.secure_url,
      meta_tag,
      meta_desc,
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

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "achievements" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(req.file.buffer);
      });

      data.image = uploadResult.secure_url;
    }

    data.title = req.body.title || data.title;
    data.slug = req.body.slug || data.slug;
    data.desc = req.body.desc || data.desc;
    data.meta_tag = req.body.meta_tag ?? data.meta_tag;
    data.meta_desc = req.body.meta_desc ?? data.meta_desc;
    data.updated_by = req.body.updated_by || data.updated_by;

    await data.save();

    res.status(200).json({
      success: true,
      message: "Achievement updated successfully",
      data,
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
    const data = await Achievement.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Achievement deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
