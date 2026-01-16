import ObjName from "../../models/add_by_admin/ObjName.js";

/* ===============================
   CREATE
================================ */
export const createObjName = async (req, res) => {
  try {
    const { name, status, created_by } = req.body;

    if (!name || !created_by) {
      return res.status(400).json({
        success: false,
        message: "name and created_by are required",
      });
    }

    const data = await ObjName.create({
      name,
      status,
      created_by,
    });

    res.status(201).json({
      success: true,
      message: "Created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   GET ALL
================================ */
export const getAllObjNames = async (req, res) => {
  try {
    const data = await ObjName.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   GET BY ID
================================ */
export const getObjNameById = async (req, res) => {
  try {
    const data = await ObjName.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   UPDATE
================================ */
export const updateObjName = async (req, res) => {
  try {
    const { name, status, updated_by } = req.body;

    const data = await ObjName.findByIdAndUpdate(
      req.params.id,
      {
        name,
        status,
        updated_by,
      },
      { new: true }
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   DELETE
================================ */
export const deleteObjName = async (req, res) => {
  try {
    const data = await ObjName.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
