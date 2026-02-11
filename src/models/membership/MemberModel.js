import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
    /* ================= Personal Information ================= */
    title: { type: String, required: true }, // Mr, Shri, Mrs
    applicantName: { type: String, required: true },
    surname: { type: String, required: true },
    fatherMotherSpouseName: { type: String, required: true },
    gender: { type: String, required: true },

    qualification: { type: String, required: true },
    occupation: { type: String, required: true },
    organizationType: { type: String, required: true },
    designation: { type: String, required: true },
    dob: { type: Date, required: true },

    mobile: { type: String, required: true },
    alternateNo: { type: String, required: true },
    email: { type: String, required: true },
    aadharNo: { type: String, required: true },

    /* ================= Address ================= */
    address: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    pinCode: { type: String, required: true },
    bloodGroup: { type: String },

    /* ================= Emergency ================= */
    relation: { type: String, required: true },
    emergencyContact: { type: String, required: true },

    /* ================= Initiatives ================= */
    initiatives: [{ type: String }],

    /* ================= Area of Contribution ================= */
    volunteeringFor: { type: String, required: true }, // 7_days, 15_days, weekends
    networkingFor: { type: String, required: true },
    areaOfInterest: { type: String, required: true },
    monetarySupport: { type: String, required: true },

    /* ================= References ================= */
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

    /* ================= Profile Picture ================= */
    profilePic: { type: String }, // Cloudinary URL
  },
  { timestamps: true }
);

export default mongoose.model("Member", MemberSchema);
