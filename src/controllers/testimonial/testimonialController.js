import Testimonial from "../../models/testimonial/testimonialModel.js";
import cloudinary from "../../config/cloudinary.js";

/* ===============================
   HELPERS
================================ */
const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "testimonials" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });

const deleteFromCloudinary = async (url) => {
  if (!url) return;
  const publicId = url.split("/").pop().split(".")[0];
  await cloudinary.uploader.destroy(`testimonials/${publicId}`);
};

/* ===============================
   CREATE TESTIMONIAL
================================ */
export const createTestimonial = async (req, res) => {
  try {
    const { name, desc, status, created_by, image_alt } = req.body;

    if (!name || !desc || !created_by || !req.file) {
      return res.status(400).json({
        success: false,
        message: "name, image, desc and created_by are required",
      });
    }

    // upload image to cloudinary
    const uploadResult = await uploadToCloudinary(req.file.buffer);

    const data = await Testimonial.create({
      name,
      image: uploadResult.secure_url,
      image_alt,
      desc,
      status,
      created_by,
    });

    res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
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
   GET ALL TESTIMONIALS
================================ */
export const getAllTestimonials = async (req, res) => {
  try {
    const data = await Testimonial.find().sort({ createdAt: -1 });

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
   GET TESTIMONIAL BY ID
================================ */
export const getTestimonialById = async (req, res) => {
  try {
    const data = await Testimonial.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
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
   UPDATE TESTIMONIAL
================================ */
export const updateTestimonial = async (req, res) => {
  try {
    const data = await Testimonial.findById(req.params.id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    // if new image uploaded
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "testimonials" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(req.file.buffer);
      });

      data.image = uploadResult.secure_url;
    }

    data.name = req.body.name || data.name;
    data.desc = req.body.desc || data.desc;
    data.status = req.body.status || data.status;
    data.updated_by = req.body.updated_by || data.updated_by;

    await data.save();

    res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
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
   DELETE TESTIMONIAL
================================ */
export const deleteTestimonial = async (req, res) => {
  try {
    const data = await Testimonial.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    await deleteFromCloudinary(data.image);
    await data.deleteOne();

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
