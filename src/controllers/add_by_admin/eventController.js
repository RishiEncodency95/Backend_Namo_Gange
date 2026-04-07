import cloudinary from "../../config/cloudinary.js";
import Event from "../../models/add_by_admin/eventModel.js";

/* ================= CLOUDINARY HELPER ================= */
const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "events" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });
/* ===============================
   CREATE EVENT
================================ */
export const createEvent = async (req, res) => {
  try {
    const {
      name,
      start_date,
      end_date,
      image,
      image_alt,
      reporting_point,
      coordinator_contact,
      reporting_time,
      HSN_code,
      link,
      description,
      status,
      created_by,
      updated_by,
    } = req.body;

    if (!name || !created_by) {
      return res.status(400).json({
        success: false,
        message: "name and created_by are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required for a new event",
      });
    }

    const uploadResult = await uploadToCloudinary(req.file.buffer);

    const data = await Event.create({
      name,
      start_date,
      end_date,
      image: uploadResult.secure_url,
      image_alt,
      reporting_point,
      coordinator_contact,
      reporting_time,
      HSN_code,
      link,
      description,
      status,
      created_by,
      updated_by,
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   GET ALL EVENTS
================================ */
export const getAllEvents = async (req, res) => {
  try {
    const data = await Event.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   GET EVENT BY ID
================================ */
export const getEventById = async (req, res) => {
  try {
    const data = await Event.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   UPDATE EVENT
================================ */
export const updateEvent = async (req, res) => {
  try {
    const data = await Event.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Prepare updated image URL
    let imageUrl = data.image;
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    }

    data.name = req.body.name ?? data.name;
    data.start_date = req.body.start_date ?? data.start_date;
    data.end_date = req.body.end_date ?? data.end_date;
    data.image = imageUrl;
    data.reporting_point = req.body.reporting_point ?? data.reporting_point;
    data.coordinator_contact =
      req.body.coordinator_contact ?? data.coordinator_contact;
    data.reporting_time = req.body.reporting_time ?? data.reporting_time;
    data.HSN_code = req.body.HSN_code ?? data.HSN_code;
    data.link = req.body.link ?? data.link;
    data.image_alt = req.body.image_alt ?? data.image_alt;
    data.description = req.body.description ?? data.description;
    data.status = req.body.status ?? data.status;
    data.updated_by = req.body.updated_by ?? data.updated_by;

    await data.save();

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   DELETE EVENT
================================ */
export const deleteEvent = async (req, res) => {
  try {
    const data = await Event.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    const publicId = data.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`events/${publicId}`);
    await data.deleteOne();

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
