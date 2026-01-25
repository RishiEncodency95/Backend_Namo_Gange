import mongoose from "mongoose";

const TrustBodySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String, // ✅ ONLY CLOUDINARY URL
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    description: {
      type: String,
      default: "",
      trim: true,
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
  { timestamps: true }
);

export default mongoose.model("TrustBody", TrustBodySchema);
