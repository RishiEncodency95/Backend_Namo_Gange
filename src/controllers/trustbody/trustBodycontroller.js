import TrustBody from "../../models/trustbodies/TrustBodyModel.js";
import slugify from "slugify";
import cloudinary from "../../config/cloudinary.js";
import fs from "fs";

/* ======================================================
   CREATE TRUST BODY
====================================================== */
export const createTrustBody = async (req, res) => {
  try {
    const { name, designation, status, description } = req.body;

    if (!name || !designation) {
      return res.status(400).json({
        success: false,
        message: "Name and Designation are required",
      });
    }

    const slug = slugify(name, { lower: true, strict: true });

    const existing = await TrustBody.findOne({ slug });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Trust body with this name already exists",
      });
    }

    let imageData = null;

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "trustbodies",
      });

      fs.unlinkSync(req.file.path);

      imageData = {
        url: upload.secure_url,
        public_id: upload.public_id,
      };
    }

    const trustBody = await TrustBody.create({
      name,
      slug,
      designation,
      status: status || "active",
      description,
      image: imageData,
    });

    res.status(201).json({
      success: true,
      message: "Trust Body added successfully",
      data: trustBody,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   GET ALL TRUST BODIES (PAGINATION)
====================================================== */
export const getAllTrustBodies = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const total = await TrustBody.countDocuments(filter);

    const data = await TrustBody.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   GET SINGLE TRUST BODY (ID / SLUG)
====================================================== */
export const getTrustBody = async (req, res) => {
  try {
    const { id } = req.params;

    const trustBody = await TrustBody.findOne({
      $or: [{ _id: id }, { slug: id }],
    });

    if (!trustBody) {
      return res.status(404).json({
        success: false,
        message: "Trust Body not found",
      });
    }

    res.status(200).json({
      success: true,
      data: trustBody,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid ID or Slug",
    });
  }
};

/* ======================================================
   UPDATE TRUST BODY
====================================================== */
export const updateTrustBody = async (req, res) => {
  try {
    const { id } = req.params;

    const trustBody = await TrustBody.findById(id);
    if (!trustBody) {
      return res.status(404).json({
        success: false,
        message: "Trust Body not found",
      });
    }

    if (req.body.name && req.body.name !== trustBody.name) {
      trustBody.name = req.body.name;
      trustBody.slug = slugify(req.body.name, { lower: true, strict: true });
    }

    trustBody.designation = req.body.designation ?? trustBody.designation;
    trustBody.status = req.body.status ?? trustBody.status;
    trustBody.description = req.body.description ?? trustBody.description;

    if (req.file) {
      // delete old image
      if (trustBody.image?.public_id) {
        await cloudinary.uploader.destroy(trustBody.image.public_id);
      }

      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "trustbodies",
      });

      fs.unlinkSync(req.file.path);

      trustBody.image = {
        url: upload.secure_url,
        public_id: upload.public_id,
      };
    }

    await trustBody.save();

    res.status(200).json({
      success: true,
      message: "Trust Body updated successfully",
      data: trustBody,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   DELETE TRUST BODY
====================================================== */
export const deleteTrustBody = async (req, res) => {
  try {
    const { id } = req.params;

    const trustBody = await TrustBody.findById(id);
    if (!trustBody) {
      return res.status(404).json({
        success: false,
        message: "Trust Body not found",
      });
    }

    if (trustBody.image?.public_id) {
      await cloudinary.uploader.destroy(trustBody.image.public_id);
    }

    await trustBody.deleteOne();

    res.status(200).json({
      success: true,
      message: "Trust Body deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   TOGGLE STATUS
====================================================== */
export const toggleTrustBodyStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const trustBody = await TrustBody.findById(id);
    if (!trustBody) {
      return res.status(404).json({
        success: false,
        message: "Trust Body not found",
      });
    }

    trustBody.status = trustBody.status === "active" ? "inactive" : "active";
    await trustBody.save();

    res.status(200).json({
      success: true,
      message: "Status updated",
      status: trustBody.status,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
