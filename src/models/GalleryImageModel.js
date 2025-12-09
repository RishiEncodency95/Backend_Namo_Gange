import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true }, // cloudinary URL
    category: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    orderBy: { type: Number, default: 0 },
    createdBy: { type: String, default: null }, // admin name/id
  },
  { timestamps: true } // adds createdAt and updatedAt
);

export default mongoose.model("GalleryImage", GallerySchema);
