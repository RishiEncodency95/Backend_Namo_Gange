import Occupation from "../../models/add_by_admin/occupationModel.js";

/* ===============================
   CREATE OCCUPATION
================================ */
export const createOccupation = async (req, res) => {
  try {
    const occupation = await Occupation.create(req.body);

    res.status(201).json({
      success: true,
      message: "Occupation created successfully",
      data: occupation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* ===============================
   GET ALL OCCUPATIONS
================================ */
export const getAllOccupations = async (req, res) => {
  try {
    const occupations = await Occupation.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: occupations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* ===============================
   GET OCCUPATION BY ID
================================ */
export const getOccupationById = async (req, res) => {
  try {
    const occupation = await Occupation.findById(req.params.id);

    if (!occupation) {
      return res.status(404).json({
        success: false,
        message: "Occupation not found",
      });
    }

    res.status(200).json({
      success: true,
      data: occupation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* ===============================
   UPDATE OCCUPATION
================================ */
export const updateOccupation = async (req, res) => {
  try {
    const occupation = await Occupation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Occupation updated successfully",
      data: occupation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* ===============================
   DELETE OCCUPATION
================================ */
export const deleteOccupation = async (req, res) => {
  try {
    await Occupation.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Occupation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
