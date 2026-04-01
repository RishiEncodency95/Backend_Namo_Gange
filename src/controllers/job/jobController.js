import Job from "../../models/job/JobModel.js";

// ================= CREATE =================
export const createJob = async (req, res) => {
  try {
    const data = await Job.create(req.body);

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= GET ALL =================
export const getJobs = async (req, res) => {
  try {
    const data = await Job.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= GET SINGLE =================
export const getJobById = async (req, res) => {
  try {
    const data = await Job.findById(req.params.id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= UPDATE =================
export const updateJob = async (req, res) => {
  try {
    const data = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= DELETE =================
export const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
