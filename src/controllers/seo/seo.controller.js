import Seo from "../../models/seo/seo.model.js";

/* ================= CREATE ================= */

export const createSeo = async (req, res) => {
  try {
    const { page_name, page_path, metaTitle, metaDescription } = req.body;

    if (!page_name || !page_path || !metaTitle || !metaDescription) {
      return res.status(400).json({
        success: false,
        message: "Page Name, Page Path, Meta Title and Meta Description are required",
      });
    }

    const existing = await Seo.findOne({ page_path });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "SEO for this page already exists",
      });
    }

    const seo = await Seo.create({
      ...req.body,
      created_by: req.userId,
    });

    res.status(201).json({
      success: true,
      message: "SEO created successfully",
      data: seo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ================= GET ALL ================= */

export const getAllSeo = async (req, res) => {
  try {
    const seoList = await Seo.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: seoList.length,
      data: seoList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET BY ID ================= */

export const getSeoById = async (req, res) => {
  try {
    const seo = await Seo.findById(req.params.id);

    if (!seo) {
      return res.status(404).json({
        success: false,
        message: "SEO not found",
      });
    }

    res.json({
      success: true,
      data: seo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SEO BY PAGE PATH
export const getSeoByPath = async (req, res) => {
  try {
    const seo = await Seo.findOne({
      page_path: req.params.path,
      status: "Active",
    });

    if (!seo) {
      return res.status(404).json({
        success: false,
        message: "SEO not found",
      });
    }

    res.json({
      success: true,
      data: seo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= UPDATE ================= */

export const updateSeo = async (req, res) => {
  try {
    const updated = await Seo.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updated_by: req.userId,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "SEO not found",
      });
    }

    res.json({
      success: true,
      message: "SEO updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= DELETE ================= */

export const deleteSeo = async (req, res) => {
  try {
    const deleted = await Seo.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "SEO not found",
      });
    }

    res.json({
      success: true,
      message: "SEO deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
