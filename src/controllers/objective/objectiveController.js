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

/* DELETE HELPER */
const deleteFromCloudinary = async (url) => {
  if (!url) return;
  try {
    const publicId = url.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`objectives/${publicId}`);
  } catch (error) {
    console.error("Error deleting image from cloudinary:", error);
  }
};

/* CREATE */
export const createObjective = async (req, res) => {
  try {
    const { title, slug, desc, status, created_by, image_alt, logo_alt } =
      req.body;

    if (!title || !slug || !desc || !created_by) {
      return res.status(400).json({
        success: false,
        message: "title, slug, desc and created_by are required",
      });
    }

    if (!req.files || !req.files.image || !req.files.logo) {
      return res.status(400).json({
        success: false,
        message: "Both image and logo are required",
      });
    }

    const exists = await Objective.findOne({ slug });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "slug already exists",
      });
    }

    const imageUploadResult = await uploadToCloudinary(
      req.files.image[0].buffer,
    );
    const logoUploadResult = await uploadToCloudinary(req.files.logo[0].buffer);

    const data = await Objective.create({
      title,
      slug,
      desc,
      image: imageUploadResult.secure_url,
      image_alt,
      logo: logoUploadResult.secure_url,
      logo_alt,
      status,
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

    // Check if slug is being updated and if it already exists
    if (req.body.slug && req.body.slug !== data.slug) {
      const existingSlug = await Objective.findOne({ slug: req.body.slug });
      if (existingSlug) {
        return res.status(409).json({
          success: false,
          message: "Slug already exists",
        });
      }
    }

    let imageUrl = data.image;
    let logoUrl = data.logo;

    if (req.files && req.files.image) {
      await deleteFromCloudinary(data.image);
      const uploadResult = await uploadToCloudinary(req.files.image[0].buffer);
      imageUrl = uploadResult.secure_url;
    }

    if (req.files && req.files.logo) {
      await deleteFromCloudinary(data.logo);
      const uploadResult = await uploadToCloudinary(req.files.logo[0].buffer);
      logoUrl = uploadResult.secure_url;
    }

    data.title = req.body.title || data.title;
    data.slug = req.body.slug || data.slug;
    data.desc = req.body.desc || data.desc;
    data.status = req.body.status || data.status;
    data.image_alt = req.body.image_alt ?? data.image_alt;
    data.logo_alt = req.body.logo_alt ?? data.logo_alt;
    data.image = imageUrl;
    data.logo = logoUrl;
    data.updated_by = req.body.updated_by || data.updated_by;

    const updatedObjective = await data.save();

    res.status(200).json({
      success: true,
      message: "Objective updated successfully",
      data: updatedObjective,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* DELETE */
export const deleteObjective = async (req, res) => {
  try {
    const data = await Objective.findById(req.params.id);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Objective not found" });
    }

    await deleteFromCloudinary(data.image);
    await deleteFromCloudinary(data.logo);
    await data.deleteOne();

    res.status(200).json({
      success: true,
      message: "Objective deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
