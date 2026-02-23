import mongoose from "mongoose";

const HeroSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    tag_line: { type: String, default: "" },
    description: { type: String, default: "" },
    link: { type: String, default: "" },
    image: { type: String, required: true }, // cloudinary URL
    alt_text: { type: String, default: "Home Hero" },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
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
  { timestamps: true },
);

export default mongoose.model("Hero", HeroSchema);
