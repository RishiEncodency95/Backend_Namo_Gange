import mongoose from "mongoose";

const objectiveSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      type: String, // cloudinary URL
      required: true,
    },
    logo: {
      type: String, // cloudinary URL
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    meta_keywords: {
      type: String,
      default: "",
    },
    meta_desc: {
      type: String,
      default: "",
    },
    created_by: {
      type: String,
      required: true,
      trim: true,
    },
    updated_by: {
      type: String,
      default: null,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Objective", objectiveSchema);
