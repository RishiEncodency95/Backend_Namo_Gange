import mongoose from "mongoose";

const statusOptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    user: {
      type: String,
      default: null,
      trim: true,
    },
    updated_by: {
      type: String,
      default: null,
      trim: true,
    },
    added: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: "added", updatedAt: "updated" },
  }
);

const StatusOption = mongoose.model("StatusOption", statusOptionSchema);
export default StatusOption;
