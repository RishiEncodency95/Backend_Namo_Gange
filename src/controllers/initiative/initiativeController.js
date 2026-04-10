import Initiative from "../../models/initiative/InitiativeModel.js";
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
      page_description,
      objective_catagory,
      status,
      created_by,
      image_alt,
      pages_images_alts,
    } = req.body;

    const mainImageFile = req.files?.["image"]?.[0];
    const pagesImagesFiles = req.files?.["pages_images"] || [];

    if (!title || !slug || !desc || !mainImageFile || !created_by) {
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

    // ✅ Upload main image
    const mainUploadResult = await uploadToCloudinary(mainImageFile.buffer);

    // ✅ Upload supplemental images
    const pagesImagesUploadPromises = pagesImagesFiles.map((file) =>
      uploadToCloudinary(file.buffer)
    );
    const pagesUploadResults = await Promise.all(pagesImagesUploadPromises);

    // Parse alts
    let alts = [];
    try {
      if (pages_images_alts) {
        alts = typeof pages_images_alts === "string" ? JSON.parse(pages_images_alts) : pages_images_alts;
      }
    } catch (e) { }

    const pages_images = pagesUploadResults.map((res, i) => ({
      url: res.secure_url,
      alt: alts[i] || "",
    }));

    const data = await Initiative.create({
      title,
      slug,
      desc,
      page_description,
      link,
      image: mainUploadResult.secure_url,
      image_alt,
      pages_images,
      objective_catagory,
      status,
      created_by,
      updated_by: created_by,
    });

    res.status(201).json({
      success: true,
      message: "Initiative created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
      return res.status(404).json({ success: false, message: "Initiative not found" });
    }

    if (req.body.slug && req.body.slug !== data.slug) {
      const existingSlug = await Initiative.findOne({ slug: req.body.slug });
      if (existingSlug) {
        return res
          .status(409)
          .json({ success: false, message: "Slug already exists" });
      }
    }

    // 1. Handle main image
    let imageUrl = data.image;
    const mainImageFile = req.files?.["image"]?.[0];
    if (mainImageFile) {
      await deleteFromCloudinary(data.image);
      const uploadResult = await uploadToCloudinary(mainImageFile.buffer);
      imageUrl = uploadResult.secure_url;
    }

    // 2. Handle pages_images (bulk)
    let finalPagesImages = data.pages_images || [];
    if (req.body.existing_pages_images) {
      try {
        const existing = typeof req.body.existing_pages_images === "string"
          ? JSON.parse(req.body.existing_pages_images)
          : req.body.existing_pages_images;
        finalPagesImages = Array.isArray(existing) ? existing : [existing];
      } catch (e) { }
    }

    const pagesImagesFiles = req.files?.["pages_images"] || [];
    if (pagesImagesFiles.length > 0) {
      const uploadPromises = pagesImagesFiles.map((file) => uploadToCloudinary(file.buffer));
      const uploadResults = await Promise.all(uploadPromises);

      let newAlts = [];
      try {
        if (req.body.new_pages_images_alts) {
          newAlts = typeof req.body.new_pages_images_alts === "string"
            ? JSON.parse(req.body.new_pages_images_alts)
            : req.body.new_pages_images_alts;
        }
      } catch (e) { }

      const newImageObjects = uploadResults.map((res, i) => ({
        url: res.secure_url,
        alt: newAlts[i] || "",
      }));
      finalPagesImages = [...finalPagesImages, ...newImageObjects];
    }

    data.title = req.body.title || data.title;
    data.slug = req.body.slug || data.slug;
    data.desc = req.body.desc || data.desc;
    data.page_description = req.body.page_description || data.page_description;
    data.link = req.body.link ?? data.link;
    data.image = imageUrl;
    data.image_alt = req.body.image_alt ?? data.image_alt;
    data.pages_images = finalPagesImages;
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
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===============================
   DELETE INITIATIVE
 ================================ */
export const deleteInitiative = async (req, res) => {
  try {
    const data = await Initiative.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ success: false, message: "Initiative not found" });
    }

    // Delete main image
    await deleteFromCloudinary(data.image);

    // Delete supplemental images
    if (data.pages_images && data.pages_images.length > 0) {
      const deletePromises = data.pages_images.map((img) => deleteFromCloudinary(img.url));
      await Promise.all(deletePromises);
    }

    await data.deleteOne();

    res.status(200).json({
      success: true,
      message: "Initiative deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
