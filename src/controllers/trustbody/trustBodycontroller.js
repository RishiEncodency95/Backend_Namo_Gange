import TrustBody from "../../models/trustbodies/TrustBodyModel.js";
import slugify from "slugify";
import cloudinary from "../../config/cloudinary.js";

/* ================= CLOUDINARY HELPER ================= */
const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "namo_gange" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });

/* ================= CREATE ================= */
export const createTrustBody = async (req, res) => {
  try {
    const { name, designation, status, description, created_by } = req.body;

    if (!name || !designation || !created_by || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Name, designation, created_by and image are required",
      });
    }

    const slug = slugify(name, { lower: true, strict: true });

    const uploadResult = await uploadToCloudinary(req.file.buffer);

    const trustBody = await TrustBody.create({
      name,
      slug,
      designation,
      status: status || "active",
      description,
      created_by,
      image: uploadResult.secure_url, // ✅ ONLY URL
    });

    res.status(201).json({
      success: true,
      data: trustBody,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= GET ALL ================= */
export const getAllTrustBodies = async (req, res) => {
  try {
    const data = await TrustBody.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE ================= */
export const updateTrustBody = async (req, res) => {
  try {
    const trustBody = await TrustBody.findById(req.params.id);

    if (!trustBody) {
      return res.status(404).json({
        success: false,
        message: "Trust Body not found",
      });
    }

    // name + slug
    if (req.body.name && req.body.name !== trustBody.name) {
      trustBody.name = req.body.name;
      trustBody.slug = slugify(req.body.name, {
        lower: true,
        strict: true,
      });
    }

    trustBody.designation = req.body.designation ?? trustBody.designation;
    trustBody.status = req.body.status ?? trustBody.status;
    trustBody.description = req.body.description ?? trustBody.description;
    trustBody.updated_by = req.body.updated_by ?? trustBody.updated_by;

    // ✅ IMAGE UPDATE (optional)
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      trustBody.image = uploadResult.secure_url;
    }

    await trustBody.save();

    res.status(200).json({
      success: true,
      data: trustBody,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= DELETE ================= */
export const deleteTrustBody = async (req, res) => {
  try {
    const trustBody = await TrustBody.findById(req.params.id);

    if (!trustBody) {
      return res.status(404).json({
        success: false,
        message: "Trust Body not found",
      });
    }

    await trustBody.deleteOne();

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
