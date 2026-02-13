import cloudinary from "../../config/cloudinary.js";
import AGSEvent from "../../models/add_by_admin/AGSEventModel.js";

/* ================= CLOUDINARY HELPER ================= */
const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "ags_events" }, (error, result) => {
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

    if (!name || !start_date || !end_date || !created_by) {
      return res.status(400).json({
        success: false,
        message: "name, start_date, end_date and created_by are required",
      });
    }

    let imageUrl = "";
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    }

    const data = await AGSEvent.create({
      name,
      start_date,
      end_date,
      image: imageUrl,
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
    const data = await AGSEvent.find().sort({ createdAt: -1 });

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
    const data = await AGSEvent.findById(req.params.id);

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
    const data = await AGSEvent.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    data.name = req.body.name ?? data.name;
    data.start_date = req.body.start_date ?? data.start_date;
    data.end_date = req.body.end_date ?? data.end_date;
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      data.image = uploadResult.secure_url;
    }
    data.image = req.body.image ?? data.image;
    data.reporting_point = req.body.reporting_point ?? data.reporting_point;
    data.coordinator_contact =
      req.body.coordinator_contact ?? data.coordinator_contact;
    data.reporting_time = req.body.reporting_time ?? data.reporting_time;
    data.HSN_code = req.body.HSN_code ?? data.HSN_code;
    data.link = req.body.link ?? data.link;
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
    const data = await AGSEvent.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    if (data.image) {
      const publicId = data.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`ags_events/${publicId}`);
    }
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