// controllers/newsletter/newsLetterController.js
import NewsLetter from "../../models/newsletters/NewsLetterModel.js";
import cloudinary from "../../config/cloudinary.js";

/* ================= CLOUDINARY HELPER ================= */
const uploadToCloudinary = (buffer, folder, resource_type = "image") =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder, resource_type }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });

/* ================= CREATE ================= */
export const createNewsLetter = async (req, res) => {
  try {
    const { title, monthYear, order_by, status } = req.body;

    if (!title || !monthYear || !req.files?.image || !req.files?.pdf) {
      return res.status(400).json({
        success: false,
        message: "Title, monthYear, image and pdf are required",
      });
    }

    const imageUpload = await uploadToCloudinary(
      req.files.image[0].buffer,
      "newsletters/images"
    );

    const pdfUpload = await uploadToCloudinary(
      req.files.pdf[0].buffer,
      "newsletters/pdfs",
      "raw" // 👈 PDF ke liye
    );

    const data = await NewsLetter.create({
      title,
      monthYear,
      order_by: order_by || 0,
      status: status || "Active",
      image: imageUpload.secure_url,
      pdf: pdfUpload.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "Newsletter created successfully",
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= GET ALL ================= */
export const getAllNewsLetters = async (req, res) => {
  try {
    const data = await NewsLetter.find().sort({
      order_by: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= GET BY ID ================= */
export const getNewsLetterById = async (req, res) => {
  try {
    const data = await NewsLetter.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Newsletter not found",
      });
    }

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: "Invalid ID" });
  }
};

/* ================= UPDATE ================= */
export const updateNewsLetter = async (req, res) => {
  try {
    const newsletter = await NewsLetter.findById(req.params.id);

    if (!newsletter) {
      return res.status(404).json({
        success: false,
        message: "Newsletter not found",
      });
    }

    newsletter.title = req.body.title ?? newsletter.title;
    newsletter.monthYear = req.body.monthYear ?? newsletter.monthYear;
    newsletter.order_by = req.body.order_by ?? newsletter.order_by;
    newsletter.status = req.body.status ?? newsletter.status;

    // IMAGE UPDATE
    if (req.files?.image) {
      const img = await uploadToCloudinary(
        req.files.image[0].buffer,
        "newsletters/images"
      );
      newsletter.image = img.secure_url;
    }

    // PDF UPDATE
    if (req.files?.pdf) {
      const pdf = await uploadToCloudinary(
        req.files.pdf[0].buffer,
        "newsletters/pdfs",
        "raw"
      );
      newsletter.pdf = pdf.secure_url;
    }

    await newsletter.save();

    res.status(200).json({
      success: true,
      message: "Newsletter updated successfully",
      data: newsletter,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= DELETE ================= */
export const deleteNewsLetter = async (req, res) => {
  try {
    const data = await NewsLetter.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Newsletter not found",
      });
    }

    await data.deleteOne();

    res.status(200).json({
      success: true,
      message: "Newsletter deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
