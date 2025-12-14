import mongoose from "mongoose";

const GalleryVideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    video_link: { type: String, required: true }, // ✅ YouTube / MP4 URL

    category: { type: String, required: true },
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
  { timestamps: true }
);

export default mongoose.model("GalleryVideo", GalleryVideoSchema);
