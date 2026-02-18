import mongoose from "mongoose";

const AGSDelegateSchema = new mongoose.Schema(
  {
    /* ========== BASIC INFO ========== */
    title: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String },
    profession: { type: String },
    age: { type: Number },
    event: { type: String },

    /* ========== CONTACT INFO ========== */
    mobile: { type: String, required: true },
    alternate: { type: String },
    landline: { type: String },
    email: { type: String },

    address: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    pin: { type: String },

    /* ========== EDUCATION / CATEGORY ========== */
    category: { type: String },
    college: { type: String },
    university: { type: String },

    /* ========== LEAD INFO ========== */
    enquiryFor: { type: String },
    leadForward: { type: String },
    // source: { type: String },
    mode: { type: String },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    coordinator: { type: String },
    remark: { type: String },

    /* ========== BUSINESS INFO ========== */
    companyName: { type: String },
    companyAddress: { type: String },
    companyCountry: { type: String },
    companyState: { type: String },
    companyCity: { type: String },
    companyPin: { type: String },

    // client status history
    clientStatus : {
      type:String,
    },
    updatedStatusBy: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AGSDelegate", AGSDelegateSchema);
