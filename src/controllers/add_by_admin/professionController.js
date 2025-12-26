import Profession from "../../models/add_by_admin/ProfessionModel.js";

/* ===============================
   CREATE PROFESSION
================================ */
export const createProfession = async (req, res) => {
  try {
    const profession = await Profession.create(req.body);
    res.status(201).json({
      success: true,
      data: profession,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* ===============================
   GET ALL PROFESSIONS
================================ */
export const getAllProfessions = async (req, res) => {
  try {
    const professions = await Profession.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: professions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* ===============================
   GET PROFESSION BY ID
================================ */
export const getProfessionById = async (req, res) => {
  try {
    const profession = await Profession.findById(req.params.id);
    if (!profession) {
      return res.status(404).json({
        success: false,
        message: "Profession not found",
      });
    }
    res.status(200).json({
      success: true,
      data: profession,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* ===============================
   UPDATE PROFESSION
================================ */
export const updateProfession = async (req, res) => {
  try {
    const profession = await Profession.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!profession) {
      return res.status(404).json({
        success: false,
        message: "Profession not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profession,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* ===============================
   DELETE PROFESSION
================================ */
export const deleteProfession = async (req, res) => {
  try {
    const profession = await Profession.findByIdAndDelete(req.params.id);

    if (!profession) {
      return res.status(404).json({
        success: false,
        message: "Profession not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profession deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
