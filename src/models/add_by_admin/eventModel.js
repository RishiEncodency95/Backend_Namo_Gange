import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: String,
      required: true,
    },

    reporting_point: {
      type: String,
      trim: true,
    },

    coordinator_contact: {
      type: String,
      trim: true,
    },

    reporting_time: {
      type: String,
      trim: true,
    },

    HSN_code: {
      type: String,
      trim: true,
    },

    link: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
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
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
