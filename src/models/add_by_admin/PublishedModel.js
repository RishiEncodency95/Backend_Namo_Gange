import mongoose from "mongoose";

const PublishedSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
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

export default mongoose.model("Published", PublishedSchema);
