import Member from "../../models/membership/MemberModel.js";
import cloudinary from "../../config/cloudinary.js";

/* ================= CLOUDINARY HELPER ================= */
const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "members" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });

/* ================= CREATE MEMBER ================= */
export const createMember = async (req, res) => {
  try {
    let imageUrl = null;

    // Upload image (optional)
    if (req.file) {
      const upload = await uploadToCloudinary(req.file.buffer);
      imageUrl = upload.secure_url;
    }

    // Parse initiatives
    let initiatives = [];
    if (req.body.initiatives) {
      try {
        initiatives =
          typeof req.body.initiatives === "string"
            ? JSON.parse(req.body.initiatives)
            : req.body.initiatives;
      } catch {
        initiatives = [];
      }
    }

    const member = await Member.create({
      title: req.body.title,
      applicantName: req.body.applicant_name,
      surname: req.body.surname,
      fatherMotherSpouseName: req.body.father_name,
      gender: req.body.gender,
      qualification: req.body.qualification,
      occupation: req.body.occupation,
      organizationType: req.body.organisation_type,
      designation: req.body.designation,
      dob: req.body.dob,
      mobile: req.body.mobile,
      alternateNo: req.body.alternate_mobile,
      email: req.body.email,
      aadharNo: req.body.aadhaar,
      address: req.body.address,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      pinCode: req.body.pincode,
      bloodGroup: req.body.blood_group,
      relation: req.body.emergency_relation,
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
      profilePic: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Member created successfully",
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* ================= GET ALL MEMBERS ================= */
export const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================= GET MEMBER BY ID ================= */
export const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member)
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });

    res.json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================= UPDATE MEMBER ================= */
export const updateMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member)
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });

    let imageUrl = member.profilePic;

    // Upload new image (optional)
    if (req.file) {
      const upload = await uploadToCloudinary(req.file.buffer);
      imageUrl = upload.secure_url;
    }

    // Parse initiatives
    let initiatives = member.initiatives;
    if (req.body.initiatives) {
      try {
        initiatives =
          typeof req.body.initiatives === "string"
            ? JSON.parse(req.body.initiatives)
            : req.body.initiatives;
      } catch {}
    }

    Object.assign(member, {
      title: req.body.title ?? member.title,
      applicantName: req.body.applicant_name ?? member.applicantName,
      surname: req.body.surname ?? member.surname,
      fatherMotherSpouseName:
        req.body.father_name ?? member.fatherMotherSpouseName,
      gender: req.body.gender ?? member.gender,
      qualification: req.body.qualification ?? member.qualification,
      occupation: req.body.occupation ?? member.occupation,
      organizationType:
        req.body.organisation_type ?? member.organizationType,
      designation: req.body.designation ?? member.designation,
      dob: req.body.dob ?? member.dob,
      mobile: req.body.mobile ?? member.mobile,
      alternateNo:
        req.body.alternate_mobile ?? member.alternateNo,
      email: req.body.email ?? member.email,
      aadharNo: req.body.aadhaar ?? member.aadharNo,
      address: req.body.address ?? member.address,
      country: req.body.country ?? member.country,
      state: req.body.state ?? member.state,
      city: req.body.city ?? member.city,
      pinCode: req.body.pincode ?? member.pinCode,
      bloodGroup: req.body.blood_group ?? member.bloodGroup,
      relation:
        req.body.emergency_relation ?? member.relation,
      emergencyContact:
        req.body.emergency_contact ?? member.emergencyContact,
      initiatives,
      volunteeringFor:
        req.body.volunteering_for ?? member.volunteeringFor,
      networkingFor:
        req.body.networking_for ?? member.networkingFor,
      areaOfInterest:
        req.body.area_of_interest ?? member.areaOfInterest,
      monetarySupport:
        req.body.monetary_support ?? member.monetarySupport,
      reference1: {
        name: req.body.ref1_name ?? member.reference1?.name,
        mobile:
          req.body.ref1_mobile ?? member.reference1?.mobile,
        email:
          req.body.ref1_email ?? member.reference1?.email,
      },
      reference2: {
        name: req.body.ref2_name ?? member.reference2?.name,
        mobile:
          req.body.ref2_mobile ?? member.reference2?.mobile,
        email:
          req.body.ref2_email ?? member.reference2?.email,
      },
      profilePic: imageUrl,
    });

    await member.save();

    res.json({
      success: true,
      message: "Member updated successfully",
      data: member,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================= DELETE MEMBER ================= */
export const deleteMember = async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
