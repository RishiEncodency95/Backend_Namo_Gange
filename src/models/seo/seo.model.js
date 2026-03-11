// import mongoose from "mongoose";

// const seoSchema = new mongoose.Schema(
//   {
//     page_name: {
//       type: String,
//       required: true,
//     },

//     page_path: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     metaTitle: {
//       type: String,
//       required: true,
//       trim: true,
//       maxlength: 60,
//     },

//     metaKeywords: {
//       type: String,
//       trim: true,
//     },

//     metaDescription: {
//       type: String,
//       required: true,
//       trim: true,
//       maxlength: 160,
//     },

//     openGraphTags: {
//       type: String, // JSON string ya raw meta content
//       default: "",
//     },

//     schemaMarkup: {
//       type: String, // JSON-LD
//       default: "",
//     },

//     status: {
//       type: String,
//       enum: ["Active", "Inactive"],
//       default: "Active",
//     },

//     created_by: {
//       type: String,
//       required: true,
//     },

//     updated_by: {
//       type: String,
//       default: null,
//     },
//   },
//   { timestamps: true },
// );

// export default mongoose.model("Seo", seoSchema);

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

    h1tag: {
      type: String,
      default: "",
    },

    page_banner: {
      type: String, // Store file path/URL
      default: "",
    },

    metaTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 65, // Changed from 60 to 65
    },

    metaKeywords: {
      type: String,
      trim: true,
      default: "",
    },

    metaDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 155, // Changed from 160 to 155
    },

    banner_alt: {
      type: String,
      default: "",
    },

    open_graph: {
      type: String, // Store file path/URL
      default: "",
    },

    openGraphTags: {
      type: String, // HTML content from editor
      default: "",
    },

    schemaMarkup: {
      type: String, // JSON-LD / HTML content
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