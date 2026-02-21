import Banner from "../../models/home-banner/BannerModel.js";
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

/* ================= CREATE BANNER ================= */
export const createBanner = async (req, res) => {
  try {
    const { title, link, status, created_by, schedule, alt_text } = req.body;

    if (!title || !link || !created_by) {
      return res.status(400).json({
        success: false,
        message: "title, link and created_by are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }
    let parsedSchedule = {};
    if (schedule) {
      try {
        parsedSchedule = JSON.parse(schedule);
      } catch (error) {
        parsedSchedule = schedule;
      }
    }
    const uploadResult = await uploadToCloudinary(req.file.buffer);

    const banner = await Banner.create({
      title,
      link,
      image: uploadResult.secure_url,
      alt_text: alt_text || "Home Banner",
      status: status || "Active",
      created_by,
      schedule: parsedSchedule,
    });

    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      data: banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET ALL BANNERS ================= */
export const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: banners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET BANNER BY ID ================= */
export const getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      data: banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= UPDATE BANNER ================= */
export const updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    let imageUrl = banner.image;

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    }

    banner.title = req.body.title || banner.title;
    banner.link = req.body.link || banner.link;
    banner.status = req.body.status || banner.status;
    banner.updated_by = req.body.updated_by || banner.updated_by;
    banner.alt_text = req.body.alt_text || banner.alt_text;
    banner.image = imageUrl;
    if (req.body.schedule) {
      try {
        banner.schedule = JSON.parse(req.body.schedule);
      } catch (error) {
        banner.schedule = req.body.schedule;
      }
    }
    await banner.save();

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      data: banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= DELETE BANNER ================= */
export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    // Cloudinary public_id extract
    const publicId = banner.image.split("/").slice(-1)[0].split(".")[0];

    await cloudinary.uploader.destroy(`namo_gange/${publicId}`);
    await banner.deleteOne();

    res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
      data: banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
