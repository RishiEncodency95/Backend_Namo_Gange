import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
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
    image: {
      type: String, // cloudinary URL
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    meta_tag: {
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

export default mongoose.model("Achievement", achievementSchema);
