import Occupation from "../../models/add_by_admin/occupationModel.js";

/* ===============================
   CREATE OCCUPATION
================================ */
export const createOccupation = async (req, res) => {
  try {
    // console.log("REQ BODY 👉", req.body); // 🔥 debug

    const { name, status, created_by, updated_by } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Occupation name is required",
      });
    }

    const exists = await Occupation.findOne({ name });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Occupation already exists",
      });
    }

    const data = await Occupation.create({
      name,
      status: status || "Active",
      created_by,
      updated_by,
    });

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
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
    // console.log("REQ BODY 👉", req.body);

    const { name, status, updated_by } = req.body;

    const occupation = await Occupation.findById(req.params.id);
    if (!occupation) {
      return res.status(404).json({
        success: false,
        message: "Occupation not found",
      });
    }

    if (name && name !== occupation.name) {
      const exists = await Occupation.findOne({ name });
      if (exists) {
        return res.status(409).json({
          success: false,
          message: "Occupation already exists",
        });
      }
    }

    occupation.name = name ?? occupation.name;
    occupation.status = status ?? occupation.status;
    occupation.updated_by = updated_by ?? occupation.updated_by;

    await occupation.save();

    res.status(200).json({
      success: true,
      data: occupation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
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
