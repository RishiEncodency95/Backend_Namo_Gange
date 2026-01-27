import RecentUpdate from "../../models/recent-update/RecentUpdateModel.js";
import cloudinary from "../../config/cloudinary.js";

/* ================= CLOUDINARY HELPER ================= */
const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "recent_updates" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });

/* ================= CREATE ================= */
export const createRecentUpdate = async (req, res) => {
  try {
    const { title, published_by, date, status, description, created_by } =
      req.body;

    if (!title || !published_by || !date || !created_by || !req.file) {
      return res.status(400).json({
        success: false,
        message:
          "title, published_by, date, created_by and image are required",
      });
    }

    const uploadResult = await uploadToCloudinary(req.file.buffer);

    const recentUpdate = await RecentUpdate.create({
      title,
      published_by,
      date,
      status: status || "Active",
      description,
      created_by,
      image: uploadResult.secure_url, // ✅ ONLY URL
    });

    res.status(201).json({
      success: true,
      data: recentUpdate,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= GET ALL ================= */
export const getAllRecentUpdates = async (req, res) => {
  try {
    const data = await RecentUpdate.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE ================= */
export const updateRecentUpdate = async (req, res) => {
  try {
    const recentUpdate = await RecentUpdate.findById(req.params.id);

    if (!recentUpdate) {
      return res.status(404).json({
        success: false,
        message: "Recent Update not found",
      });
    }

    recentUpdate.title = req.body.title ?? recentUpdate.title;
    recentUpdate.published_by =
      req.body.published_by ?? recentUpdate.published_by;
    recentUpdate.date = req.body.date ?? recentUpdate.date;
    recentUpdate.status = req.body.status ?? recentUpdate.status;
    recentUpdate.description =
      req.body.description ?? recentUpdate.description;
    recentUpdate.updated_by =
      req.body.updated_by ?? recentUpdate.updated_by;

    // ✅ IMAGE OPTIONAL
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      recentUpdate.image = uploadResult.secure_url;
    }

    await recentUpdate.save();

    res.status(200).json({
      success: true,
      data: recentUpdate,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= DELETE ================= */
export const deleteRecentUpdate = async (req, res) => {
  try {
    const recentUpdate = await RecentUpdate.findById(req.params.id);

    if (!recentUpdate) {
      return res.status(404).json({
        success: false,
        message: "Recent Update not found",
      });
    }

    await recentUpdate.deleteOne();

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
