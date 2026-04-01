import JobApplication from "../../models/job/JobApplyModel.js";

// ================= CREATE =================
export const createJobApplication = async (req, res) => {
  try {
    const data = await JobApplication.create(req.body);

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data,
    });
  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= GET ALL =================
export const getAllApplications = async (req, res) => {
  try {
    const data = await JobApplication.find()
      .sort({ createdAt: -1 })
      .populate("created_by updated_by", "name email");

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= GET SINGLE =================
export const getApplicationById = async (req, res) => {
  try {
    const data = await JobApplication.findById(req.params.id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= UPDATE =================
export const updateApplication = async (req, res) => {
  try {
    const data = await JobApplication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "Application updated",
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= DELETE =================
export const deleteApplication = async (req, res) => {
  try {
    await JobApplication.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Application deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
