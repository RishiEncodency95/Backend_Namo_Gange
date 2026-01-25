import Published from "../../models/add_by_admin/PublishedModel.js";

/* =============================
   CREATE PUBLISHED
============================= */
export const createPublished = async (req, res) => {
  try {
    const { name, status, created_by } = req.body;

    if (!name || !created_by) {
      return res.status(400).json({
        success: false,
        message: "Name and created_by are required",
      });
    }

    const exists = await Published.findOne({ name });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Published already exists",
      });
    }

    const data = await Published.create({
      name,
      status: status || "Active",
      created_by,
    });

    res.status(201).json({
      success: true,
      message: "Published created successfully",
      data,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* =============================
   GET ALL PUBLISHED
============================= */
export const getAllPublished = async (req, res) => {
  try {
    const data = await Published.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* =============================
   UPDATE PUBLISHED
============================= */
export const updatePublished = async (req, res) => {
  try {
    const { name, status, updated_by } = req.body;

    const published = await Published.findById(req.params.id);
    if (!published) {
      return res.status(404).json({
        success: false,
        message: "Published not found",
      });
    }

    if (name) published.name = name;
    if (status) published.status = status;
    if (updated_by) published.updated_by = updated_by;

    await published.save();

    res.json({
      success: true,
      message: "Published updated successfully",
      data: published,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* =============================
   DELETE PUBLISHED
============================= */
export const deletePublished = async (req, res) => {
  try {
    const data = await Published.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ success: false });
    }

    await data.deleteOne();
    res.json({ success: true, message: "Published deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
