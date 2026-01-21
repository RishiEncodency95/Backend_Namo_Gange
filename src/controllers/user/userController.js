// import User from "../../models/user/User.js";
// import bcrypt from "bcryptjs";

// /* ======================
//    CREATE USER
// ====================== */
// export const createUser = async (req, res) => {
//   try {
//     const { password, confirm_password, ...rest } = req.body;

//     if (password !== confirm_password) {
//       return res.status(400).json({ message: "Password mismatch" });
//     }

//     const hashPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       ...rest,
//       password: hashPassword,
//       created_by: req.userId || null,
//     });

//     res.status(201).json({ success: true, data: user });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ======================
//    GET ALL USERS
// ====================== */
// export const getUsers = async (req, res) => {
//   try {
//     const users = await User.find({ status: "Active" }).select("-password");
//     res.json({ success: true, data: users });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ======================
//    GET SINGLE USER
// ====================== */
// export const getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).select("-password");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({ success: true, data: user });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ======================
//    UPDATE USER
// ====================== */
// export const updateUser = async (req, res) => {
//   try {
//     const updated = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         ...req.body,
//         updated_by: req.userId || null,
//       },
//       { new: true }
//     ).select("-password");

//     res.json({ success: true, data: updated });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ======================
//    DELETE USER (SOFT)
// ====================== */
// export const deleteUser = async (req, res) => {
//   try {
//     await User.findByIdAndUpdate(req.params.id, {
//       status: "Inactive",
//     });

//     res.json({ success: true, message: "User deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

import User from "../../models/user/User.js";
import bcrypt from "bcryptjs";

/* ======================
   CREATE USER
====================== */
export const createUser = async (req, res) => {
  try {
    const { password, confirm_password, email, username, ...rest } = req.body;

    if (password !== confirm_password) {
      return res.status(400).json({ message: "Password mismatch" });
    }

    // ✅ duplicate check
    const existUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existUser) {
      return res.status(409).json({
        message: "Email or Username already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      ...rest,
      email,
      username,
      password: hashPassword,
      created_by: req.userId || null,
    });

    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ======================
   GET ALL USERS
====================== */
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ status: "Active" }).select("-password");
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ======================
   GET SINGLE USER
====================== */
export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
      status: "Active",
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ======================
   UPDATE USER
====================== */
export const updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // ✅ password secure update
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    updateData.updated_by = req.userId || null;

    const updated = await User.findOneAndUpdate(
      { _id: req.params.id, status: "Active" },
      updateData,
      { new: true }
    ).select("-password");

    if (!updated) {
      return res.status(404).json({ message: "User not found or inactive" });
    }

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ======================
   DELETE USER (SOFT)
====================== */
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      status: "Inactive",
      updated_by: req.userId || null,
    });

    res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
