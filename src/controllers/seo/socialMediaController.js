import SocialMedia from "../../models/seo/SocialMedia.js";

// CREATE
export const createSocialMedia = async (req, res) => {
  try {
    const data = new SocialMedia(req.body);
    await data.save();

    res.status(201).json({
      success: true,
      message: "Social media data saved",
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
export const getSocialMedia = async (req, res) => {
  try {
    const data = await SocialMedia.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
export const upsertSocialMedia = async (req, res) => {
  try {
    console.log("BODY:", req.body); // debug

    const existing = await SocialMedia.findOne();

    let data;

    if (existing) {
      // UPDATE
      data = await SocialMedia.findByIdAndUpdate(existing._id, req.body, {
        new: true,
      });
    } else {
      // CREATE
      data = await SocialMedia.create(req.body);
    }

    res.status(200).json({
      success: true,
      message: "Saved successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE (optional)
export const deleteSocialMedia = async (req, res) => {
  try {
    const { id } = req.params;

    await SocialMedia.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
