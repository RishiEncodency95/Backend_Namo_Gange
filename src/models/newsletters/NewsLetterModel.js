import mongoose from "mongoose";

const NewsLetterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    monthYear: {
      type: String, // format: YYYY-MM (2025-01)
      required: true,
    },

    order: {
      type: Number,
      required: true,
    },

    image: {
      url: String,
      public_id: String,
    },

    pdf: {
      url: String,
      public_id: String,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("NewsLetter", NewsLetterSchema);
