import SeoCode from "../../models/seo/seocodeModel.js";
import cloudinary from "../../config/cloudinary.js";

/* ================= CLOUDINARY HELPER ================= */
const uploadToCloudinary = (buffer, folder, resourceType = "auto") =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: folder, resource_type: resourceType },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      )
      .end(buffer);
  });

const deleteFromCloudinary = async (url, folder, resourceType = "image") => {
  if (!url) return;
  try {
    // Extract filename from URL
    const parts = url.split("/");
    const filenameWithExt = parts[parts.length - 1];

    let publicId;
    if (resourceType === "raw") {
      // For raw files, publicId usually includes extension
      publicId = `${folder}/${filenameWithExt}`;
    } else {
      // For images, extension is usually stripped
      const filename = filenameWithExt.split(".")[0];
      publicId = `${folder}/${filename}`;
    }

    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
  } catch (error) {
    console.error("Cloudinary delete error:", error);
  }
};

/* ================= CREATE ================= */
export const createSeoCode = async (req, res) => {
  try {
    const { seo_code, status } = req.body;

    // Handle file uploads
    let googleSearchConsoleUrl = "";
    let reportUrl = "";
    let sitemapUrl = "";

    if (req.files) {
      if (req.files.google_search_console) {
        const result = await uploadToCloudinary(
          req.files.google_search_console[0].buffer,
          "namo_gange/seo_code",
          "raw", // .html
        );
        googleSearchConsoleUrl = result.secure_url;
      }
      if (req.files.report) {
        const result = await uploadToCloudinary(
          req.files.report[0].buffer,
          "namo_gange/seo_code",
          "raw", // .txt
        );
        reportUrl = result.secure_url;
      }
      if (req.files.sitemap) {
        const result = await uploadToCloudinary(
          req.files.sitemap[0].buffer,
          "namo_gange/seo_code",
          "raw", // .xml
        );
        sitemapUrl = result.secure_url;
      }
    }

    const newSeoCode = await SeoCode.create({
      seo_code,
      google_search_console: googleSearchConsoleUrl,
      report: reportUrl,
      sitemap: sitemapUrl,
      status: status || "Active",
      created_by: req.userId,
    });

    res.status(201).json({
      success: true,
      message: "SEO Code created successfully",
      data: newSeoCode,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= GET ALL ================= */
export const getAllSeoCode = async (req, res) => {
  try {
    const list = await SeoCode.find().sort({ createdAt: -1 });
    res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= GET BY ID ================= */
export const getSeoCodeById = async (req, res) => {
  try {
    const data = await SeoCode.findById(req.params.id);
    if (!data)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= UPDATE ================= */
export const updateSeoCode = async (req, res) => {
  try {
    const seoCode = await SeoCode.findById(req.params.id);
    if (!seoCode)
      return res.status(404).json({ success: false, message: "Not found" });

    let { google_search_console, report, sitemap } = seoCode;

    if (req.files) {
      if (req.files.google_search_console) {
        await deleteFromCloudinary(
          seoCode.google_search_console,
          "namo_gange/seo_code",
          "raw",
        );
        const result = await uploadToCloudinary(
          req.files.google_search_console[0].buffer,
          "namo_gange/seo_code",
          "raw",
        );
        google_search_console = result.secure_url;
      }
      if (req.files.report) {
        await deleteFromCloudinary(
          seoCode.report,
          "namo_gange/seo_code",
          "raw",
        );
        const result = await uploadToCloudinary(
          req.files.report[0].buffer,
          "namo_gange/seo_code",
          "raw",
        );
        report = result.secure_url;
      }
      if (req.files.sitemap) {
        await deleteFromCloudinary(
          seoCode.sitemap,
          "namo_gange/seo_code",
          "raw",
        );
        const result = await uploadToCloudinary(
          req.files.sitemap[0].buffer,
          "namo_gange/seo_code",
          "raw",
        );
        sitemap = result.secure_url;
      }
    }

    const updated = await SeoCode.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        google_search_console,
        report,
        sitemap,
        updated_by: req.userId,
      },
      { new: true },
    );

    res.json({ success: true, message: "Updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= DELETE ================= */
export const deleteSeoCode = async (req, res) => {
  try {
    const seoCode = await SeoCode.findById(req.params.id);
    if (!seoCode)
      return res.status(404).json({ success: false, message: "Not found" });

    await deleteFromCloudinary(
      seoCode.google_search_console,
      "namo_gange/seo_code",
      "raw",
    );
    await deleteFromCloudinary(seoCode.report, "namo_gange/seo_code", "raw");
    await deleteFromCloudinary(seoCode.sitemap, "namo_gange/seo_code", "raw");

    await seoCode.deleteOne();
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
