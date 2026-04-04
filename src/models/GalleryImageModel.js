import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, default: "" },
      },
    ],
    image_alt: { type: String }, // common alt text
    category: { type: String, required: true },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    createdBy: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("GalleryImage", GallerySchema);
