import Coordinator from "../../models/add_by_admin/Coordinator.js";

/* ================= CREATE ================= */
export const createCoordinator = async (req, res) => {
  try {
    const coordinator = await Coordinator.create(req.body);
    res.status(201).json({ success: true, data: coordinator });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/* ================= GET ALL ================= */
export const getAllCoordinators = async (req, res) => {
  try {
    const coordinators = await Coordinator.find().sort({ createdAt: -1 });
    res.json({ success: true, data: coordinators });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================= GET BY ID ================= */
export const getCoordinatorById = async (req, res) => {
  try {
    const coordinator = await Coordinator.findById(req.params.id);
    if (!coordinator)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data: coordinator });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================= UPDATE ================= */
export const updateCoordinator = async (req, res) => {
  try {
    const coordinator = await Coordinator.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!coordinator)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data: coordinator });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/* ================= DELETE ================= */
export const deleteCoordinator = async (req, res) => {
  try {
    const coordinator = await Coordinator.findByIdAndDelete(req.params.id);

    if (!coordinator)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
