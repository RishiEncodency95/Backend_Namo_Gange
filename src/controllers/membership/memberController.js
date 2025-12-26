import Member from "../../models/membership/MemberModel.js";
import cloudinary from "../../config/cloudinary.js";
import fs from "fs";

/* ================= CREATE ================= */
export const createMember = async (req, res) => {
  try {
    let imageUrl = null;

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "members",
      });
      imageUrl = upload.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const member = await Member.create({
      ...req.body,
      initiatives: req.body.initiatives ? JSON.parse(req.body.initiatives) : [],
      reference1: JSON.parse(req.body.reference1),
      reference2: JSON.parse(req.body.reference2),
      profilePic: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Member created successfully",
      data: member,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================= GET ALL ================= */
export const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================= GET BY ID ================= */
export const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================= UPDATE ================= */
export const updateMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member)
      return res.status(404).json({ success: false, message: "Not found" });

    let imageUrl = member.profilePic;

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "members",
      });
      imageUrl = upload.secure_url;
      fs.unlinkSync(req.file.path);
    }

    Object.assign(member, {
      ...req.body,
      initiatives: req.body.initiatives
        ? JSON.parse(req.body.initiatives)
        : member.initiatives,
      reference1: req.body.reference1
        ? JSON.parse(req.body.reference1)
        : member.reference1,
      reference2: req.body.reference2
        ? JSON.parse(req.body.reference2)
        : member.reference2,
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

/* ================= DELETE ================= */
export const deleteMember = async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Member deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
