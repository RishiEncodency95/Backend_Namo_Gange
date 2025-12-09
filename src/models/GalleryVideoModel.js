import mongoose from "mongoose";

const GalleryVideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    video: { type: String, required: true }, // Cloudinary video URL

    category: { type: String, required: true }, // "event" ya koi category  
    date: { type: Date, required: true },

    location: { type: String, required: true },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    orderBy: { type: Number, default: 0 },

    createdBy: { type: String, default: null },
  },
  { timestamps: true } // createdAt + updatedAt
);

export default mongoose.model("GalleryVideo", GalleryVideoSchema);
