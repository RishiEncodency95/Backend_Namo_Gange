import mongoose from "mongoose";

const VolunteerSchema = new mongoose.Schema(
  {
    /* ================= PERSONAL INFO ================= */
    title: { type: String, required: true },
    applicantName: { type: String, required: true },
    surname: { type: String, required: true },
    fatherName: { type: String, required: true },
    gender: { type: String, required: true },
    qualification: String,
    occupation: String,
    organisationType: String,
    designation: String,
    dob: Date,

    mobile: { type: String, required: true },
    alternateMobile: String,
    email: { type: String, required: true },
    aadhaar: String,

    address: String,
    country: String,
    state: String,
    city: String,
    pincode: String,

    emergencyRelation: String,
    emergencyContact: String,

    initiatives: [String],
    volunteeringFor: String,
    networkingFor: String,
    areaOfInterest: String,
    monetarySupport: String,

    /* ================= REFERENCES ================= */
    reference1: {
      name: String,
      mobile: String,
      email: String,
    },
    reference2: {
      name: String,
      mobile: String,
      email: String,
    },

    /* ================= VOLUNTEER INFO ================= */
    areaOfRegion: String,
    reportTo: String,
    volunteerDesignation: String,

    bankName: String,
    accountNo: String,
    ifscCode: String,

    /* ================= BUSINESS INFO ================= */
    companyName: String,
    businessAddress: String,
    businessCountry: String,
    businessState: String,
    businessCity: String,
    businessPincode: String,
    businessDesignation: String,
    businessContactNo: String,

    /* ================= IMAGE ================= */
    profilePic: String,
  },
  { timestamps: true }
);

export default mongoose.model("Volunteer", VolunteerSchema);
