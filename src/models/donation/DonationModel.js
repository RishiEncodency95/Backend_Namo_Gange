import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", ""],
      default: "",
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    SewaType: {
      type: String,
      required: true,
    },
    donationPackage: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    pan: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
    },
    anonymous: {
      type: Boolean,
      default: false,
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

export default mongoose.model("Donation", donationSchema);
