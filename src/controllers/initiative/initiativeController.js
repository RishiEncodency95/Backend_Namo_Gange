import Initiative from "../../models/initiative/initiativeModel.js";
import cloudinary from "../../config/cloudinary.js";

/* ===============================
   HELPERS
================================ */
const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "initiatives" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });

const deleteFromCloudinary = async (url) => {
  if (!url) return;
  const publicId = url.split("/").pop().split(".")[0];
  await cloudinary.uploader.destroy(`initiatives/${publicId}`);
};
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

      created_by,
      image_alt,
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
    const uploadResult = await uploadToCloudinary(req.file.buffer);

    const data = await Initiative.create({
      title,
      slug,
      desc,
      link,
      image: uploadResult.secure_url, // ✅ URL save
      image_alt,
      objective_catagory,
      status,

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

    if (req.body.slug && req.body.slug !== data.slug) {
      const existingSlug = await Initiative.findOne({ slug: req.body.slug });
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
    data.objective_catagory =
      req.body.objective_catagory || data.objective_catagory;
    data.status = req.body.status || data.status;
    data.updated_by = req.body.updated_by || data.updated_by;

    const updatedData = await data.save();

    res.status(200).json({
      success: true,
      message: "Initiative updated successfully",
      data: updatedData,
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
    const data = await Initiative.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Initiative not found",
      });
    }

    await deleteFromCloudinary(data.image);
    await data.deleteOne();

    res.status(200).json({
      success: true,
      message: "Initiative deleted successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
