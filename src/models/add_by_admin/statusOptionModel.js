import mongoose from "mongoose";

const statusOptionSchema = new mongoose.Schema(
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
      default: "Inactive",
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
  { timestamps: true } // createdAt, updatedAt
);

export default mongoose.model("StatusOption", statusOptionSchema);
