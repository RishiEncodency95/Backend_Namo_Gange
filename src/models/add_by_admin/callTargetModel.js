import mongoose from "mongoose";

const callTargetSchema = new mongoose.Schema(
  {
    employee: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    call_target: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    created_by: {
      type: String,
      default: null,
    },

    updated_by: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CallTarget", callTargetSchema);
