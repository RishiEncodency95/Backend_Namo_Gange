import Department from "../../models/add_by_admin/Department.js";

/* ===============================
   CREATE DEPARTMENT
================================ */
export const createDepartment = async (req, res) => {
  try {
    const { name, status, created_by } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, error: "Department name is required" });
    }

    const exists = await Department.findOne({ name: name.trim() });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, error: "Department already exists" });
    }

    const department = await Department.create({
      name: name.trim(),
      status,
      created_by,
    });

    res.status(201).json({
      success: true,
      data: department,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ===============================
   GET ALL DEPARTMENTS
================================ */
export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: departments,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ===============================
   GET DEPARTMENT BY ID
================================ */
export const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res
        .status(404)
        .json({ success: false, error: "Department not found" });
    }

    res.status(200).json({
      success: true,
      data: department,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ===============================
   UPDATE DEPARTMENT
================================ */
export const updateDepartment = async (req, res) => {
  try {
    const { name, status, updated_by } = req.body;

    const department = await Department.findById(req.params.id);
    if (!department) {
      return res
        .status(404)
        .json({ success: false, error: "Department not found" });
    }

    if (name) department.name = name.trim();
    if (status) department.status = status;
    if (updated_by) department.updated_by = updated_by;

    await department.save();

    res.status(200).json({
      success: true,
      data: department,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ===============================
   DELETE DEPARTMENT
================================ */
export const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);

    if (!department) {
      return res
        .status(404)
        .json({ success: false, error: "Department not found" });
    }

    res.status(200).json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
