import User from "../../models/user/User.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    const { password, email, username, ...rest } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "Email, Username and Password are required",
      });
    }

    const existUser = await User.findOne({
      $or: [{ email: email.trim() }, { username: username.trim() }],
    });

    if (existUser) {
      return res.status(409).json({
        success: false,
        message: "Email or Username already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      ...rest,
      email: email.trim(),
      username: username.trim(),
      password: hashPassword,
      created_by: req.userId || rest.created_by || null,
      updated_by: req.userId || rest.updated_by || null,
    });

    res.status(201).json({ success: true, data: user });
  } catch (err) {
    console.error("CREATE USER ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    } else {
      delete updateData.password;
    }

    updateData.updated_by = req.userId || updateData.updated_by || null;

    const updated = await User.findOneAndUpdate(
      { _id: req.params.id },
      updateData,
      { new: true }
    ).select("-password");

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      updated_by: req.userId || null,
    });

    res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
