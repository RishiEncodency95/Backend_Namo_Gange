import ClientStatus from "../../models/clientStatus/clientStatus.model.js";

/* ================= CREATE ================= */

export const createClientStatus = async (req, res) => {
  try {
    const status = await ClientStatus.create(req.body);

    res.status(201).json({
      success: true,
      data: status,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET ALL ================= */

export const getAllClientStatuses = async (req, res) => {
  try {
    const statuses = await ClientStatus.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: statuses.length,
      data: statuses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ================= GET BY CLIENT ================= */

export const getClientStatusByClientId = async (req, res) => {
  try {
    const statuses = await ClientStatus.find({
      client_id: req.params.clientId,
    })
      .populate("created_by", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: statuses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= UPDATE ================= */

export const updateClientStatus = async (req, res) => {
  try {
    const updated = await ClientStatus.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Status not found",
      });
    }

    res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= DELETE ================= */

export const deleteClientStatus = async (req, res) => {
  try {
    await ClientStatus.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Client status deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
