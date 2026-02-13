import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../../controllers/add_by_admin/agsEventController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import upload from "../../utils/multer.js";

const router = express.Router();

router.post("/create", upload.single("image"), authMiddleware, createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", upload.single("image"), authMiddleware, updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);

export default router;
