import CategoryVideo from "../../models/add_by_admin/CategoryVideoModel.js";

// ================= CREATE =================
export const createCategoryVideo = async (req, res) => {
  try {
    const { title, category, order_by, status, created_by } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: "title and category are required",
      });
    }

    const data = await CategoryVideo.create({
      title,
      category,
      order_by,
      status,
      created_by,
    });

    res.status(201).json({
      success: true,
      message: "Category Video created",
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ================= GET ALL =================
export const getAllCategoryVideos = async (req, res) => {
  try {
    const data = await CategoryVideo.find().sort({
      order_by: 1,
      createdAt: -1,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ================= GET BY ID =================
export const getCategoryVideoById = async (req, res) => {
  try {
    const data = await CategoryVideo.findById(req.params.id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Category Video not found",
      });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ================= UPDATE =================
export const updateCategoryVideo = async (req, res) => {
  try {
    const { title, category, order_by, status, updated_by } = req.body;

    const data = await CategoryVideo.findById(req.params.id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Category Video not found",
      });
    }

    data.title = title || data.title;
    data.category = category || data.category;
    data.order_by = order_by ?? data.order_by;
    data.status = status || data.status;
    data.updated_by = updated_by || data.updated_by;

    const updated = await data.save();

    res.status(200).json({
      success: true,
      message: "Category Video updated",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ================= DELETE =================
export const deleteCategoryVideo = async (req, res) => {
  try {
    const data = await CategoryVideo.findById(req.params.id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Category Video not found",
      });
    }

    await data.deleteOne();

    res.status(200).json({
      success: true,
      message: "Category Video deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
