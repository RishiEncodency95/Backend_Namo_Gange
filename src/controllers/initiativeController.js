import Initiative from "../models/InitiativeModel.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// ---------------- CREATE ----------------
export const createInitiative = async (req, res) => {
  try {
    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "Image required" });

    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "initiatives",
    });

    fs.unlinkSync(req.file.path);

    const initiative = await Initiative.create({
      title: req.body.title,
      link: req.body.link,
      descShort: req.body.descShort,
      descLong: req.body.descLong,
      status: req.body.status,
      image: upload.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "Initiative created",
      initiative,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ---------------- GET ALL ----------------
export const getAllInitiatives = async (req, res) => {
  try {
    const data = await Initiative.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, initiatives: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ---------------- GET BY ID ----------------
export const getInitiativeById = async (req, res) => {
  try {
    const data = await Initiative.findById(req.params.id);
    if (!data)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, initiative: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ---------------- UPDATE ----------------
export const updateInitiative = async (req, res) => {
  try {
    const initiative = await Initiative.findById(req.params.id);
    if (!initiative)
      return res.status(404).json({ success: false, message: "Not found" });

    let imageURL = initiative.image;

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "initiatives",
      });

      imageURL = upload.secure_url;
      fs.unlinkSync(req.file.path);
    }

    initiative.title = req.body.title || initiative.title;
    initiative.link = req.body.link || initiative.link;
    initiative.descShort = req.body.descShort || initiative.descShort;
    initiative.descLong = req.body.descLong || initiative.descLong;
    initiative.status = req.body.status || initiative.status;
    initiative.image = imageURL;

    const updated = await initiative.save();

    res.status(200).json({
      success: true,
      message: "Initiative updated",
      initiative: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ---------------- DELETE ----------------
export const deleteInitiative = async (req, res) => {
  try {
    const initiative = await Initiative.findById(req.params.id);
    if (!initiative)
      return res.status(404).json({ success: false, message: "Not found" });

    const url = initiative.image;
    const publicId = url.split("/").pop().split(".")[0];

    await cloudinary.uploader.destroy(`initiatives/${publicId}`);

    await initiative.deleteOne();

    res.status(200).json({
      success: true,
      message: "Initiative deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
