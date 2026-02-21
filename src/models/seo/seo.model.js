import mongoose from "mongoose";

const seoSchema = new mongoose.Schema(
  {
    page_name: {
      type: String,
      required: true,
    },

    page_path: {
      type: String,
      required: true,
      unique: true,
    },

    metaTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },

    metaKeywords: {
      type: String,
      trim: true,
    },

    metaDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },

    openGraphTags: {
      type: String, // JSON string ya raw meta content
      default: "",
    },

    schemaMarkup: {
      type: String, // JSON-LD
      default: "",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    created_by: {
      type: String,
      required: true,
    },

    updated_by: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Seo", seoSchema);
