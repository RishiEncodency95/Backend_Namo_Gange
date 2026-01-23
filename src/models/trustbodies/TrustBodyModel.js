import mongoose from "mongoose";

const TrustBodySchema = new mongoose.Schema(
  {
    // Name of trust member
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 150,
    },

    // SEO-friendly URL slug
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Designation (Chairman, Trustee, Secretary etc.)
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
      maxlength: 100,
    },

    // Image path or URL
    image: {
      type: String,
      default: null,
    },

    // Active / Inactive
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    // Description / About
    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

export default mongoose.model("TrustBody", TrustBodySchema);
