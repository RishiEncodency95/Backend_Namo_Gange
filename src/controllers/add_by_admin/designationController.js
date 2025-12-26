import Designation from "../../models/add_by_admin/Designation.js";

/* ===============================
   CREATE DESIGNATION
================================ */
export const createDesignation = async (req, res) => {
  try {
    const designation = await Designation.create(req.body);
    res.status(201).json({
      success: true,
      message: "Designation created successfully",
      data: designation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   GET ALL DESIGNATIONS
================================ */
export const getAllDesignations = async (req, res) => {
  try {
    const list = await Designation.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: list,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   GET DESIGNATION BY ID
================================ */
export const getDesignationById = async (req, res) => {
  try {
    const item = await Designation.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Designation not found",
      });
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   UPDATE DESIGNATION
================================ */
export const updateDesignation = async (req, res) => {
  try {
    const updated = await Designation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Designation updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   DELETE DESIGNATION
================================ */
export const deleteDesignation = async (req, res) => {
  try {
    await Designation.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Designation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
