import StatusOption from "../../models/add_by_admin/statusOptionModel.js";

/* ===============================
   CREATE STATUS OPTION
================================ */
export const createStatusOption = async (req, res) => {
  try {
    const { name, status, created_by, updated_by } = req.body;

    if (!name || !created_by) {
      return res.status(400).json({
        success: false,
        message: "name and created_by are required",
      });
    }

    const exists = await StatusOption.findOne({ name });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Status option already exists",
      });
    }

    const data = await StatusOption.create({
      name,
      status,
      created_by,
      updated_by,
    });

    res.status(201).json({
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
   GET ALL STATUS OPTIONS
================================ */
export const getAllStatusOptions = async (req, res) => {
  try {
    const data = await StatusOption.find().sort({ createdAt: -1 });

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
   GET STATUS OPTION BY ID
================================ */
export const getStatusOptionById = async (req, res) => {
  try {
    const data = await StatusOption.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Status option not found",
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
   UPDATE STATUS OPTION
================================ */
export const updateStatusOption = async (req, res) => {
  try {
    const data = await StatusOption.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Status option not found",
      });
    }

    // unique name check
    if (req.body.name && req.body.name !== data.name) {
      const exists = await StatusOption.findOne({ name: req.body.name });
      if (exists) {
        return res.status(409).json({
          success: false,
          message: "Status option already exists",
        });
      }
    }

    data.name = req.body.name ?? data.name;
    data.status = req.body.status ?? data.status;
    data.updated_by = req.body.updated_by ?? data.updated_by;

    await data.save();

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
   DELETE STATUS OPTION
================================ */
export const deleteStatusOption = async (req, res) => {
  try {
    const data = await StatusOption.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Status option not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status option deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
