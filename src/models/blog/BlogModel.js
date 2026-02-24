import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
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

    category: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },

    meta_keyword: {
      type: String,
      default: "",
    },

    meta_description: {
      type: String,
      default: "",
    },

    image: {
      type: String, // Cloudinary URL
      required: true,
    },

    image_alt: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    createdBy: {
      type: String,
      default: null,
    },

    updatedBy: {
      type: String,
      default: null,
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

export default mongoose.model("Blog", blogSchema);
