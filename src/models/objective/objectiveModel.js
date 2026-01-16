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
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      type: String, // cloudinary URL
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    meta_keywords: {
      type: String, // comma separated
      default: "",
    },
    meta_desc: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Objective", objectiveSchema);
