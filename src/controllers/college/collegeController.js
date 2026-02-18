import College from "../../models/college/College.js";

// CREATE
export const createCollege = async (req, res) => {
  try {
    const college = new College(req.body);
    const saved = await college.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL
export const getAllColleges = async (req, res) => {
  try {
    const colleges = await College.find().sort({ createdAt: -1 });
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
export const getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college)
      return res.status(404).json({ message: "College not found" });

    res.json(college);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateCollege = async (req, res) => {
  try {
    const updated = await College.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "College not found" });

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
export const deleteCollege = async (req, res) => {
  try {
    await College.findByIdAndDelete(req.params.id);
    res.json({ message: "College deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
