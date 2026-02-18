import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    contact_person: { type: String, required: true },
    designation: { type: String },
    email: { type: String },
    mobile: { type: String },
    alternate: { type: String },
    landline: { type: String },
  },
  { _id: false }
);

const collegeSchema = new mongoose.Schema(
  {
    college_name: { type: String, required: true },
    category: { type: String },
    website: { type: String },
    address: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    pincode: { type: String },
    affilated_to: { type: String },
    status: { type: String, default: "Active" },
    contacts: [contactSchema],
  },
  { timestamps: true }
);

export default mongoose.model("College", collegeSchema);
