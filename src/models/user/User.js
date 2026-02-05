import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
    },
    department: {
      type: String,
    },
    role: {
      type: String,
      // enum: ["Admin", "SubAdmin", "User"],
      default: "Admin",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    otp: {
      type: String,
    },
    otp_expires_at: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
