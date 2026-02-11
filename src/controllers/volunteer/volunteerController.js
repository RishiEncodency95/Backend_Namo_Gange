import Volunteer from "../../models/volunteer/VolunteerModel.js";
import cloudinary from "../../config/cloudinary.js";

/* ================= CLOUDINARY HELPER ================= */
const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "volunteers" }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      })
      .end(buffer);
  });

/* ================= CREATE VOLUNTEER ================= */
export const createVolunteer = async (req, res) => {
  try {
    let imageUrl = null;

    if (req.file) {
      const upload = await uploadToCloudinary(req.file.buffer);
      imageUrl = upload.secure_url;
    }

    const initiatives =
      typeof req.body.initiatives === "string"
        ? JSON.parse(req.body.initiatives)
        : req.body.initiatives || [];

    const volunteer = await Volunteer.create({
      title: req.body.title,
      applicantName: req.body.applicant_name,
      surname: req.body.surname,
      fatherName: req.body.father_name,
      gender: req.body.gender,
      qualification: req.body.qualification,
      occupation: req.body.occupation,
      organisationType: req.body.organisation_type,
      designation: req.body.designation,
      dob: req.body.dob,

      mobile: req.body.mobile,
      alternateMobile: req.body.alternate_mobile,
      email: req.body.email,
      aadhaar: req.body.aadhaar,

      address: req.body.address,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      pincode: req.body.pincode,

      emergencyRelation: req.body.emergency_relation,
      emergencyContact: req.body.emergency_contact,

      initiatives,
      volunteeringFor: req.body.volunteering_for,
      networkingFor: req.body.networking_for,
      areaOfInterest: req.body.area_of_interest,
      monetarySupport: req.body.monetary_support,

      reference1: {
        name: req.body.ref1_name,
        mobile: req.body.ref1_mobile,
        email: req.body.ref1_email,
      },
      reference2: {
        name: req.body.ref2_name,
        mobile: req.body.ref2_mobile,
        email: req.body.ref2_email,
      },

      areaOfRegion: req.body.area_of_region,
      reportTo: req.body.report_to,
      volunteerDesignation: req.body.volunteer_designation,

      bankName: req.body.bank_name,
      accountNo: req.body.account_no,
      ifscCode: req.body.ifsc_code,

      companyName: req.body.company_name,
      businessAddress: req.body.business_address,
      businessCountry: req.body.business_country,
      businessState: req.body.business_state,
      businessCity: req.body.business_city,
      businessPincode: req.body.business_pincode,
      businessDesignation: req.body.business_designation,
      businessContactNo: req.body.business_contact_no,

      profilePic: imageUrl,
    });

    res.status(201).json({ success: true, data: volunteer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================= UPDATE VOLUNTEER ================= */
export const updateVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);

    if (!volunteer) {
      return res
        .status(404)
        .json({ success: false, message: "Volunteer not found" });
    }

    let imageUrl = volunteer.profilePic;

    if (req.file) {
      const upload = await uploadToCloudinary(req.file.buffer);
      imageUrl = upload.secure_url;
    }

    const initiatives =
      typeof req.body.initiatives === "string"
        ? JSON.parse(req.body.initiatives)
        : req.body.initiatives || volunteer.initiatives;

    Object.assign(volunteer, {
      title: req.body.title ?? volunteer.title,
      applicantName:
        req.body.applicant_name ?? volunteer.applicantName,
      surname: req.body.surname ?? volunteer.surname,
      fatherName:
        req.body.father_name ?? volunteer.fatherName,
      gender: req.body.gender ?? volunteer.gender,
      qualification:
        req.body.qualification ?? volunteer.qualification,
      occupation:
        req.body.occupation ?? volunteer.occupation,
      organisationType:
        req.body.organisation_type ?? volunteer.organisationType,
      designation:
        req.body.designation ?? volunteer.designation,
      dob: req.body.dob ?? volunteer.dob,
      mobile: req.body.mobile ?? volunteer.mobile,
      alternateMobile:
        req.body.alternate_mobile ?? volunteer.alternateMobile,
      email: req.body.email ?? volunteer.email,
      aadhaar: req.body.aadhaar ?? volunteer.aadhaar,
      address: req.body.address ?? volunteer.address,
      country: req.body.country ?? volunteer.country,
      state: req.body.state ?? volunteer.state,
      city: req.body.city ?? volunteer.city,
      pincode: req.body.pincode ?? volunteer.pincode,
      emergencyRelation:
        req.body.emergency_relation ??
        volunteer.emergencyRelation,
      emergencyContact:
        req.body.emergency_contact ?? volunteer.emergencyContact,
      initiatives,
      volunteeringFor:
        req.body.volunteering_for ?? volunteer.volunteeringFor,
      networkingFor:
        req.body.networking_for ?? volunteer.networkingFor,
      areaOfInterest:
        req.body.area_of_interest ?? volunteer.areaOfInterest,
      monetarySupport:
        req.body.monetary_support ?? volunteer.monetarySupport,
      reference1: {
        name:
          req.body.ref1_name ??
          volunteer.reference1.name,
        mobile:
          req.body.ref1_mobile ??
          volunteer.reference1.mobile,
        email:
          req.body.ref1_email ??
          volunteer.reference1.email,
      },
      reference2: {
        name:
          req.body.ref2_name ??
          volunteer.reference2.name,
        mobile:
          req.body.ref2_mobile ??
          volunteer.reference2.mobile,
        email:
          req.body.ref2_email ??
          volunteer.reference2.email,
      },
      areaOfRegion:
        req.body.area_of_region ?? volunteer.areaOfRegion,
      reportTo: req.body.report_to ?? volunteer.reportTo,
      volunteerDesignation:
        req.body.volunteer_designation ??
        volunteer.volunteerDesignation,
      bankName: req.body.bank_name ?? volunteer.bankName,
      accountNo: req.body.account_no ?? volunteer.accountNo,
      ifscCode: req.body.ifsc_code ?? volunteer.ifscCode,
      companyName: req.body.company_name ?? volunteer.companyName,
      businessAddress:
        req.body.business_address ?? volunteer.businessAddress,
      businessCountry:
        req.body.business_country ?? volunteer.businessCountry,
      businessState: req.body.business_state ?? volunteer.businessState,
      businessCity: req.body.business_city ?? volunteer.businessCity,
      businessPincode:
        req.body.business_pincode ?? volunteer.businessPincode,
      businessDesignation:
        req.body.business_designation ?? volunteer.businessDesignation,
      businessContactNo:
        req.body.business_contact_no ?? volunteer.businessContactNo,
      profilePic: imageUrl,
    });

    await volunteer.save();

    res.status(200).json({ success: true, data: volunteer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
/* ================= GET VOLUNTEER BY ID ================= */
export const getVolunteerById = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);

    if (!volunteer) {
      return res
        .status(404)
        .json({ success: false, message: "Volunteer not found" });
    }

    res.status(200).json({ success: true, data: volunteer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


/* ================= GET ALL VOLUNTEERS ================= */
export const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: volunteers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================= DELETE VOLUNTEER ================= */
export const deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);

    if (!volunteer) {
      return res
        .status(404)
        .json({ success: false, message: "Volunteer not found" });
    }

    await volunteer.remove();

    res.status(200).json({
      success: true,
      message: "Volunteer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};