import mongoose from "mongoose";

const bankSchema = new mongoose.Schema(
  {
    bank_name: {
      type: String,
      required: true,
      trim: true,
    },

    bank_branch: {
      type: String,
      trim: true,
      default: "",
    },

    account_number: {
      type: String,
      trim: true,
      required: true,
    },

    ifsc_code: {
      type: String,
      trim: true,
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
  { timestamps: true } // createdAt, updatedAt
);

export default mongoose.model("Bank", bankSchema);
