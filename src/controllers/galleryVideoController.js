import GalleryVideo from "../models/GalleryVideoModel.js";

// ---------------- CREATE ----------------
export const createGalleryVideo = async (req, res) => {
  try {
    console.log("BODY:", req.body); // 🔥 DEBUG LINE

    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Request body missing (send RAW JSON, not form-data)",
      });
    }

    const {
      title,
      video_link,
      category,
      date,
      location,
      status,
      orderBy,
      createdBy,
    } = req.body;

    if (!title || !video_link || !category || !date || !location) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const video = await GalleryVideo.create({
      title,
      video_link,
      category,
      date,
      location,
      status,
      orderBy,
      createdBy,
    });

    res.status(201).json({
      success: true,
      message: "Gallery video added",
      video,
    });
  } catch (error) {
    console.error("CREATE VIDEO ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ---------------- GET ALL ----------------
export const getAllGalleryVideos = async (req, res) => {
  try {
    const videos = await GalleryVideo.find().sort({
      orderBy: 1,
      createdAt: -1,
    });

    res.status(200).json({ success: true, videos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ---------------- GET BY ID ----------------
export const getGalleryVideoById = async (req, res) => {
  try {
    const video = await GalleryVideo.findById(req.params.id);
    if (!video)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, video });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ---------------- UPDATE ----------------
export const updateGalleryVideo = async (req, res) => {
  try {
    const video = await GalleryVideo.findById(req.params.id);
    if (!video)
      return res.status(404).json({ success: false, message: "Not found" });

    video.title = req.body.title || video.title;
    video.video_link = req.body.video_link || video.video_link;
    video.category = req.body.category || video.category;
    video.date = req.body.date || video.date;
    video.location = req.body.location || video.location;
    video.status = req.body.status || video.status;
    video.orderBy = req.body.orderBy || video.orderBy;

    const updated = await video.save();

    res.status(200).json({
      success: true,
      message: "Gallery video updated",
      video: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ---------------- DELETE ----------------
export const deleteGalleryVideo = async (req, res) => {
  try {
    const video = await GalleryVideo.findById(req.params.id);
    if (!video)
      return res.status(404).json({ success: false, message: "Not found" });

    await video.deleteOne();

    res.status(200).json({
      success: true,
      message: "Gallery video deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
