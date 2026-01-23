import NewsLetter from "../../models/newsletters/NewsLetterModel.js";
import slugify from "slugify";
import cloudinary from "../../config/cloudinary.js";
import fs from "fs";

/* ======================================================
   CREATE NEWS LETTER
====================================================== */
export const createNewsLetter = async (req, res) => {
  try {
    const { title, monthYear, order, status } = req.body;

    if (!title || !monthYear || !order) {
      return res.status(400).json({
        success: false,
        message: "Title, Month/Year and Order are required",
      });
    }

    const slug = slugify(title, { lower: true, trim: true });

    let imageData = null;
    let pdfData = null;

    if (req.files?.image) {
      const upload = await cloudinary.uploader.upload(
        req.files.image[0].path,
        { folder: "newsletters/images" }
      );
      fs.unlinkSync(req.files.image[0].path);
      imageData = { url: upload.secure_url, public_id: upload.public_id };
    }

    if (req.files?.pdf) {
      const upload = await cloudinary.uploader.upload(
        req.files.pdf[0].path,
        {
          folder: "newsletters/pdfs",
          resource_type: "raw",
        }
      );
      fs.unlinkSync(req.files.pdf[0].path);
      pdfData = { url: upload.secure_url, public_id: upload.public_id };
    }

    const newsletter = await NewsLetter.create({
      title,
      slug,
      monthYear,
      order,
      status: status || "active",
      image: imageData,
      pdf: pdfData,
    });

    res.status(201).json({
      success: true,
      message: "News Letter added successfully",
      data: newsletter,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================================================
   GET ALL NEWS LETTERS
====================================================== */
export const getAllNewsLetters = async (req, res) => {
  try {
    const data = await NewsLetter.find()
      .sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================================================
   GET SINGLE NEWS LETTER
====================================================== */
export const getNewsLetter = async (req, res) => {
  try {
    const newsletter = await NewsLetter.findOne({
      $or: [{ _id: req.params.id }, { slug: req.params.id }],
    });

    if (!newsletter) {
      return res.status(404).json({
        success: false,
        message: "News Letter not found",
      });
    }

    res.status(200).json({ success: true, data: newsletter });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid ID or slug" });
  }
};

/* ======================================================
   UPDATE NEWS LETTER
====================================================== */
export const updateNewsLetter = async (req, res) => {
  try {
    const newsletter = await NewsLetter.findById(req.params.id);
    if (!newsletter) {
      return res.status(404).json({
        success: false,
        message: "News Letter not found",
      });
    }

    if (req.body.title && req.body.title !== newsletter.title) {
      newsletter.title = req.body.title;
      newsletter.slug = slugify(req.body.title, { lower: true, trim: true });
    }

    newsletter.monthYear = req.body.monthYear ?? newsletter.monthYear;
    newsletter.order = req.body.order ?? newsletter.order;
    newsletter.status = req.body.status ?? newsletter.status;

    if (req.files?.image) {
      if (newsletter.image?.public_id) {
        await cloudinary.uploader.destroy(newsletter.image.public_id);
      }
      const upload = await cloudinary.uploader.upload(
        req.files.image[0].path,
        { folder: "newsletters/images" }
      );
      fs.unlinkSync(req.files.image[0].path);
      newsletter.image = { url: upload.secure_url, public_id: upload.public_id };
    }

    if (req.files?.pdf) {
      if (newsletter.pdf?.public_id) {
        await cloudinary.uploader.destroy(newsletter.pdf.public_id, {
          resource_type: "raw",
        });
      }
      const upload = await cloudinary.uploader.upload(
        req.files.pdf[0].path,
        {
          folder: "newsletters/pdfs",
          resource_type: "raw",
        }
      );
      fs.unlinkSync(req.files.pdf[0].path);
      newsletter.pdf = { url: upload.secure_url, public_id: upload.public_id };
    }

    await newsletter.save();

    res.status(200).json({
      success: true,
      message: "News Letter updated successfully",
      data: newsletter,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================================================
   DELETE NEWS LETTER
====================================================== */
export const deleteNewsLetter = async (req, res) => {
  try {
    const newsletter = await NewsLetter.findById(req.params.id);
    if (!newsletter) {
      return res.status(404).json({
        success: false,
        message: "News Letter not found",
      });
    }

    if (newsletter.image?.public_id) {
      await cloudinary.uploader.destroy(newsletter.image.public_id);
    }
    if (newsletter.pdf?.public_id) {
      await cloudinary.uploader.destroy(newsletter.pdf.public_id, {
        resource_type: "raw",
      });
    }

    await newsletter.deleteOne();

    res.status(200).json({
      success: true,
      message: "News Letter deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================================================
   TOGGLE STATUS
====================================================== */
export const toggleNewsLetterStatus = async (req, res) => {
  try {
    const newsletter = await NewsLetter.findById(req.params.id);
    if (!newsletter) {
      return res.status(404).json({
        success: false,
        message: "News Letter not found",
      });
    }

    newsletter.status =
      newsletter.status === "active" ? "inactive" : "active";
    await newsletter.save();

    res.status(200).json({
      success: true,
      status: newsletter.status,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
