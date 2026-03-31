import mongoose from "mongoose";

const socialMediaSchema = new mongoose.Schema(
  {
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String,
    youtube: String,
    whatsappNumber: String,
    whatsappMessage: String,
    callNumber: String,
    mail: String,
    address: String,
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true },
);

export default mongoose.model("SocialMedia", socialMediaSchema);
