import Initiative from "../../models/initiative/initiativeModel.js";
import cloudinary from "../../config/cloudinary.js";
/* ===============================
   CREATE INITIATIVE
================================ */
export const createInitiative = async (req, res) => {
  try {
    const {
      title,
      link,
      slug,
      desc,
      objective_catagory,
      status,
      meta_keywords,
      meta_desc,
      created_by,
    } = req.body;

    // ✅ image FILE req.file me aayegi
    if (!title || !slug || !desc || !req.file || !created_by) {
      return res.status(400).json({
        success: false,
        message: "title, slug, desc, image and created_by are required",
      });
    }

    const exists = await Initiative.findOne({ slug });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Slug already exists",
      });
    }

    // ✅ Upload image to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "initiatives" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(req.file.buffer);
    });

    const data = await Initiative.create({
      title,
      slug,
      desc,
      link,
      image: uploadResult.secure_url, // ✅ URL save
      objective_catagory,
      status,
      meta_keywords,
      meta_desc,
      created_by,
    });

    res.status(201).json({
      success: true,
      message: "Initiative created successfully",
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
   GET ALL INITIATIVES
================================ */
export const getAllInitiatives = async (req, res) => {
  try {
    const data = await Initiative.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
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
   GET INITIATIVE BY ID
================================ */
export const getInitiativeById = async (req, res) => {
  try {
    const data = await Initiative.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Initiative not found",
      });
    }

    res.status(200).json({
      success: true,
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
   UPDATE INITIATIVE
================================ */
export const updateInitiative = async (req, res) => {
  try {
    const data = await Initiative.findById(req.params.id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Initiative not found",
      });
    }

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "initiatives" }, (error, result) => {
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
    data.link = req.body.link ?? data.link;
    data.objective_catagory = req.body.objective_catagory || data.objective_catagory;
    data.status = req.body.status || data.status;
    data.meta_keywords = req.body.meta_keywords ?? data.meta_keywords;
    data.meta_desc = req.body.meta_desc ?? data.meta_desc;
    data.updated_by = req.body.updated_by || data.updated_by;

    await data.save();

    res.status(200).json({
      success: true,
      message: "Initiative updated successfully",
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
   DELETE INITIATIVE
================================ */
export const deleteInitiative = async (req, res) => {
  try {
    const data = await Initiative.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Initiative not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Initiative deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
