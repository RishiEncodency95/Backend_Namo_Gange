import CallTarget from "../../models/add_by_admin/callTargetModel.js";

/* ===============================
   CREATE CALL TARGET
================================ */
export const createCallTarget = async (req, res) => {
  try {
    const { employee, date, call_target, status, created_by } = req.body;

    if (!employee || !date || !call_target) {
      return res.status(400).json({
        success: false,
        message: "employee, date and call_target are required",
      });
    }

    const data = await CallTarget.create({
      employee,
      date,
      call_target,
      status,
      created_by,
    });

    res.status(201).json({
      success: true,
      message: "Call target created successfully",
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
   GET ALL CALL TARGETS
================================ */
export const getAllCallTargets = async (req, res) => {
  try {
    const data = await CallTarget.find().sort({ createdAt: -1 });

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
   GET CALL TARGET BY ID
================================ */
export const getCallTargetById = async (req, res) => {
  try {
    const data = await CallTarget.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Call target not found",
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
   UPDATE CALL TARGET
================================ */
export const updateCallTarget = async (req, res) => {
  try {
    const data = await CallTarget.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Call target not found",
      });
    }

    data.employee = req.body.employee ?? data.employee;
    data.date = req.body.date ?? data.date;
    data.call_target = req.body.call_target ?? data.call_target;
    data.status = req.body.status ?? data.status;
    data.updated_by = req.body.updated_by ?? data.updated_by;

    await data.save();

    res.status(200).json({
      success: true,
      message: "Call target updated successfully",
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
   DELETE CALL TARGET
================================ */
export const deleteCallTarget = async (req, res) => {
  try {
    const data = await CallTarget.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Call target not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Call target deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
