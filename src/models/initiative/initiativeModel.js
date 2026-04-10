import mongoose from "mongoose";

const initiativeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    link: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      required: true,
    },
    page_description: {
      type: String,
      default: "",
    },
    image: {
      type: String, // cloudinary URL
      required: true,
    },
    image_alt: {
      type: String,
    },
    pages_images: [
      {
        url: { type: String, required: true },
        alt: { type: String, default: "" },
      },
    ],
    objective_catagory: {
      type: String,
      required: false,
    },
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

export default mongoose.model("Initiative", initiativeSchema);
