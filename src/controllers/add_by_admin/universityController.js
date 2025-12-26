import University from "../../models/add_by_admin/universityModel.js";

/* ===============================
   CREATE UNIVERSITY
================================ */
export const createUniversity = async (req, res) => {
  try {
    const university = await University.create(req.body);
    res.status(201).json({
      success: true,
      message: "University created successfully",
      data: university,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

/* ===============================
   GET ALL UNIVERSITIES
================================ */
export const getAllUniversities = async (req, res) => {
  try {
    const universities = await University.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: universities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* ===============================
   GET UNIVERSITY BY ID
================================ */
export const getUniversityById = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }
    res.status(200).json({
      success: true,
      data: university,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* ===============================
   UPDATE UNIVERSITY
================================ */
export const updateUniversity = async (req, res) => {
  try {
    const updated = await University.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "University updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

/* ===============================
   DELETE UNIVERSITY
================================ */
export const deleteUniversity = async (req, res) => {
  try {
    const deleted = await University.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "University deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
