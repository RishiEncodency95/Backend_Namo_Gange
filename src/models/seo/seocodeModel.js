import mongoose from "mongoose";

const seoSchema = new mongoose.Schema(
  {
    seo_header_code: {
      type: String,
      default: "",
    },
    seo_footer_code: {
      type: String,
      default: "",
    },

    google_search_console: {
      type: String, // URL of the .html file
      default: "",
    },

    report: {
      type: String, // URL of the .txt file
      default: "",
    },

    sitemap: {
      type: String, // URL of the .xml file
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

export default mongoose.model("SeoCode", seoSchema);
