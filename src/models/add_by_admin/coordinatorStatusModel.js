import mongoose from "mongoose";

const coordinatorStatusSchema = new mongoose.Schema(
  {
    title: {
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
      default: null,
      trim: true,
    },

    updated_by: {
      type: String,
      default: null,
      trim: true,
    },
  },
  { timestamps: true } // createdAt & updatedAt
);

export default mongoose.model(
  "CoordinatorStatus",
  coordinatorStatusSchema
);
