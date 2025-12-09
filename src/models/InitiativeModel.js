import mongoose from "mongoose";

const InitiativeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    link: { type: String, required: true },

    descShort: { type: String, required: true },
    descLong: { type: String, required: true },

    image: { type: String, required: true }, // Cloudinary URL

    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

export default mongoose.model("Initiative", InitiativeSchema);
