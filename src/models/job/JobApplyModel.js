import mongoose from "mongoose";

const jobApplySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: String,
    phone: String,
    city: String,
    state: String,
    currentLocation: String,
    role: String,
    message: String,

    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Rejected"],
      default: "Pending",
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model("JobApplication", jobApplySchema);
