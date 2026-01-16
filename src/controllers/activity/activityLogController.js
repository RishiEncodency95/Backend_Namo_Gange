import ActivityLog from "../../models/activity/activityLogModel.js";

/**
 * CREATE LOG
 */
export const createActivityLog = async (req, res) => {
  try {
    const { user_id, message, link, section } = req.body;

    if (!user_id || !message || !section) {
      return res.status(400).json({
        success: false,
        message: "user_id, message and section are required",
      });
    }

    const log = await ActivityLog.create({
      user_id,
      message,
      link,
      section,
    });

    res.status(201).json({
      success: true,
      message: "Activity log created successfully",
      data: log,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET ALL LOGS
 */
export const getAllActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate("user_id", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET LOG BY ID
 */
export const getActivityLogById = async (req, res) => {
  try {
    const log = await ActivityLog.findById(req.params.id);

    if (!log) {
      return res.status(404).json({
        success: false,
        message: "Activity log not found",
      });
    }

    res.status(200).json({
      success: true,
      data: log,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/**
 * DELETE LOG
 */
export const deleteActivityLog = async (req, res) => {
  try {
    const log = await ActivityLog.findByIdAndDelete(req.params.id);

    if (!log) {
      return res.status(404).json({
        success: false,
        message: "Activity log not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Activity log deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
