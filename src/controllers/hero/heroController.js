import Hero from "../../models/hero/HeroModel.js";
import cloudinary from "../../config/cloudinary.js";

/* ================= CLOUDINARY HELPER ================= */
const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "namo_gange" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });

/* ================= CREATE HERO ================= */
export const createHero = async (req, res) => {
  try {
    const { title, tag_line, description, link, status, created_by, alt_text } =
      req.body;

    if (!title || !created_by) {
      return res.status(400).json({
        success: false,
        message: "title and created_by are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }
    const uploadResult = await uploadToCloudinary(req.file.buffer);

    const hero = await Hero.create({
      title,
      tag_line,
      description,
      link,
      image: uploadResult.secure_url,
      alt_text: alt_text || "Home Hero",
      status: status || "Active",
      created_by,
    });

    res.status(201).json({
      success: true,
      message: "Hero created successfully",
      data: hero,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET ALL HEROES ================= */
export const getAllHeroes = async (req, res) => {
  try {
    const heroes = await Hero.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: heroes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET HERO BY ID ================= */
export const getHeroById = async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);

    if (!hero) {
      return res.status(404).json({
        success: false,
        message: "Hero not found",
      });
    }

    res.status(200).json({
      success: true,
      data: hero,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= UPDATE HERO ================= */
export const updateHero = async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);

    if (!hero) {
      return res.status(404).json({
        success: false,
        message: "Hero not found",
      });
    }

    let imageUrl = hero.image;

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    }

    hero.title = req.body.title || hero.title;
    hero.tag_line = req.body.tag_line || hero.tag_line;
    hero.description = req.body.description || hero.description;
    hero.link = req.body.link || hero.link;
    hero.status = req.body.status || hero.status;
    hero.updated_by = req.body.updated_by || hero.updated_by;
    hero.alt_text = req.body.alt_text || hero.alt_text;
    hero.image = imageUrl;

    await hero.save();

    res.status(200).json({
      success: true,
      message: "Hero updated successfully",
      data: hero,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= DELETE HERO ================= */
export const deleteHero = async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);

    if (!hero) {
      return res.status(404).json({
        success: false,
        message: "Hero not found",
      });
    }

    // Cloudinary public_id extract
    const publicId = hero.image.split("/").slice(-1)[0].split(".")[0];

    await cloudinary.uploader.destroy(`namo_gange/${publicId}`);
    await hero.deleteOne();

    res.status(200).json({
      success: true,
      message: "Hero deleted successfully",
      data: hero,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
