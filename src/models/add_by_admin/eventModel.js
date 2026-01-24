import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    reporting_point: {
      type: String,
      trim: true,
      default: "",
    },

    coordinator_contact: {
      type: String,
      trim: true,
      default: "",
    },

    reporting_time: {
      type: String,
      trim: true,
      default: "",
    },

    HSN_code: {
      type: String,
      trim: true,
      default: "",
    },

    link: {
      type: String,
      trim: true,
      default: "",
    },

    description: {
      type: String,
      default: "",
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
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
