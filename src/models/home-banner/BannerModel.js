import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true }, // cloudinary URL
    alt_text: { type: String, default: "Home Banner" },
    link: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    schedule: {
      start_date: { type: String, default: "" },
      start_time: { type: String, default: "" },
      end_date: { type: String, default: "" },
      end_time: { type: String, default: "" },
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

export default mongoose.model("Banner", BannerSchema);
