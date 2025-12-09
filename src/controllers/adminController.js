import Admin from "../models/AdminModel.js";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwtUtil.js";

// REGISTER
export const registerAdmin = async (req, res) => {
  try {
    const { user_name, password, email, role, status, createdBy } = req.body;

    if (!user_name || !password || !email) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      user_name,
      password: hashed,
      email,
      role,
      status,
      createdBy,
    });

    const token = signToken({ id: admin._id, role: admin.role });

    return res.status(201).json({
      message: "Admin registered",
      admin: { ...admin._doc, password: undefined },
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// LOGIN
export const loginAdmin = async (req, res) => {
  try {
    const { user_name, password } = req.body;

    const admin = await Admin.findOne({
      $or: [{ user_name }, { email: user_name }],
    });

    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    admin.lastLogin = new Date();
    await admin.save();

    const token = signToken({ id: admin._id, role: admin.role });

    return res.status(200).json({
      message: "Login successful",
      admin: { ...admin._doc, password: undefined },
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET ALL
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET BY ID
export const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select("-password");
    if (!admin) return res.status(404).json({ message: "Not found" });

    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateAdmin = async (req, res) => {
  try {
    let data = req.body;

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const admin = await Admin.findByIdAndUpdate(req.params.id, data, {
      new: true,
    }).select("-password");

    res.json({ message: "Updated", admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteAdmin = async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
