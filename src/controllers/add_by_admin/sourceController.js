import Source from "../../models/add_by_admin/sourceModel.js";

/* ===============================
   CREATE SOURCE
================================ */
export const createSource = async (req, res) => {
  try {
    const {
      name,
      mobile,
      email,
      address,
      country,
      state,
      city,
      pinCode,
      status,
      created_by,
      updated_by,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Source name is required",
      });
    }

    const data = await Source.create({
      name,
      mobile,
      email,
      address,
      country,
      state,
      city,
      pinCode,
      status,
      created_by,
      updated_by,
    });

    res.status(201).json({
      success: true,
      message: "Source created successfully",
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
   GET ALL SOURCES
================================ */
export const getAllSources = async (req, res) => {
  try {
    const data = await Source.find().sort({ createdAt: -1 });

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
   GET SOURCE BY ID
================================ */
export const getSourceById = async (req, res) => {
  try {
    const data = await Source.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Source not found",
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
   UPDATE SOURCE
================================ */
export const updateSource = async (req, res) => {
  try {
    const source = await Source.findById(req.params.id);

    if (!source) {
      return res.status(404).json({
        success: false,
        message: "Source not found",
      });
    }

    source.name = req.body.name ?? source.name;
    source.mobile = req.body.mobile ?? source.mobile;
    source.email = req.body.email ?? source.email;
    source.address = req.body.address ?? source.address;
    source.country = req.body.country ?? source.country;
    source.state = req.body.state ?? source.state;
    source.city = req.body.city ?? source.city;
    source.pinCode = req.body.pinCode ?? source.pinCode;
    source.status = req.body.status ?? source.status;
    source.updated_by = req.body.updated_by ?? source.updated_by;

    await source.save();

    res.status(200).json({
      success: true,
      message: "Source updated successfully",
      data: source,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   DELETE SOURCE
================================ */
export const deleteSource = async (req, res) => {
  try {
    const data = await Source.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Source not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Source deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
