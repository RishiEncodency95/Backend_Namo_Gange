import StatusOption from "../../models/add_by_admin/StatusOption.js";
// ➤ Create new status option
export const createStatusOption = async (req, res) => {
  try {
    const newStatus = new StatusOption(req.body);
    await newStatus.save();
    res
      .status(201)
      .json({ message: "Status option created successfully", data: newStatus });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating status option", error: error.message });
  }
};

// ➤ Get all status options
export const getStatusOptions = async (req, res) => {
  try {
    const statuses = await StatusOption.find();
    res.status(200).json(statuses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching status options", error: error.message });
  }
};

// ➤ Get one by ID
export const getStatusOptionById = async (req, res) => {
  try {
    const status = await StatusOption.findById(req.params.id);
    if (!status)
      return res.status(404).json({ message: "Status option not found" });
    res.status(200).json(status);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching status option", error: error.message });
  }
};

// ➤ Update status option
export const updateStatusOption = async (req, res) => {
  try {
    const updated = await StatusOption.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: "Status option updated", data: updated });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating status option", error: error.message });
  }
};

// ➤ Delete status option
export const deleteStatusOption = async (req, res) => {
  try {
    await StatusOption.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Status option deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting status option", error: error.message });
  }
};
