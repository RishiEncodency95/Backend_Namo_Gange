import About from "../../models/about_us/aboutModel.js";
import cloudinary from "../../config/cloudinary.js";

/* helper */
const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "about_us" }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      })
      .end(buffer);
  });

/* DELETE HELPER */
const deleteFromCloudinary = async (url) => {
  if (!url) return;
  try {
    // Extract public_id from URL, which might contain versioning
    const publicIdWithFolder = url.split("/").slice(-2).join("/").split(".")[0];
    await cloudinary.uploader.destroy(publicIdWithFolder);
  } catch (error) {
    console.error("Error deleting image from cloudinary:", error);
  }
};

/* CREATE */
export const createAbout = async (req, res) => {
  try {
    const { title, desc, link, status, created_by, image_alt } = req.body;

    if (!title || !desc || !created_by) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and created_by are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const uploadResult = await uploadToCloudinary(req.file.buffer);

    const about = await About.create({
      title,
      desc,
      link,
      image: uploadResult.secure_url,
      image_alt,
      status,
      created_by,
    });

    res.status(201).json({
      success: true,
      message: "About section created successfully",
      data: about,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* GET ALL */
export const getAllAbouts = async (req, res) => {
  try {
    const abouts = await About.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: abouts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* GET BY ID */
export const getAboutById = async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) {
      return res
        .status(404)
        .json({ success: false, message: "About section not found" });
    }
    res.status(200).json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* UPDATE */
export const updateAbout = async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) {
      return res
        .status(404)
        .json({ success: false, message: "About section not found" });
    }

    let imageUrl = about.image;
    if (req.file) {
      await deleteFromCloudinary(about.image);
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    }

    about.title = req.body.title || about.title;
    about.desc = req.body.desc || about.desc;
    about.link = req.body.link ?? about.link;
    about.status = req.body.status || about.status;
    about.image_alt = req.body.image_alt ?? about.image_alt;
    about.updated_by = req.body.updated_by || about.updated_by;
    about.image = imageUrl;

    const updatedAbout = await about.save();

    res.status(200).json({
      success: true,
      message: "About section updated successfully",
      data: updatedAbout,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* DELETE */
export const deleteAbout = async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) {
      return res
        .status(404)
        .json({ success: false, message: "About section not found" });
    }

    await deleteFromCloudinary(about.image);
    await about.deleteOne();

    res.status(200).json({
      success: true,
      message: "About section deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
