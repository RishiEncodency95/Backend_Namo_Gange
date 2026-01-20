import Objective from "../../models/objective/objectiveModel.js";
import cloudinary from "../../config/cloudinary.js";

/* helper */
const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "objectives" }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      })
      .end(buffer);
  });

/* CREATE */
export const createObjective = async (req, res) => {
  try {
    const { title, slug, desc, status, meta_keywords, meta_desc, created_by } =
      req.body;

    if (!title || !slug || !desc || !created_by) {
      return res.status(400).json({
        success: false,
        message: "title, slug, desc and created_by are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "image is required",
      });
    }

    const exists = await Objective.findOne({ slug });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "slug already exists",
      });
    }

    const uploadResult = await uploadToCloudinary(req.file.buffer);

    const data = await Objective.create({
      title,
      slug,
      desc,
      image: uploadResult.secure_url,
      status,
      meta_keywords,
      meta_desc,
      created_by,
    });

    res.status(201).json({
      success: true,
      message: "Objective created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* GET ALL */
export const getAllObjectives = async (req, res) => {
  try {
    const data = await Objective.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* GET BY ID */
export const getObjectiveById = async (req, res) => {
  try {
    const data = await Objective.findById(req.params.id);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Objective not found" });
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* UPDATE */
export const updateObjective = async (req, res) => {
  try {
    const data = await Objective.findById(req.params.id);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Objective not found" });
    }

    let imageUrl = data.image;

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    }

    data.title = req.body.title || data.title;
    data.slug = req.body.slug || data.slug;
    data.desc = req.body.desc || data.desc;
    data.status = req.body.status || data.status;
    data.meta_keywords = req.body.meta_keywords ?? data.meta_keywords;
    data.meta_desc = req.body.meta_desc ?? data.meta_desc;
    data.image = imageUrl;
    data.updated_by = req.body.updated_by || data.updated_by;

    await data.save();

    res.status(200).json({
      success: true,
      message: "Objective updated successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* DELETE */
export const deleteObjective = async (req, res) => {
  try {
    const data = await Objective.findByIdAndDelete(req.params.id);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Objective not found" });
    }

    res.status(200).json({
      success: true,
      message: "Objective deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
