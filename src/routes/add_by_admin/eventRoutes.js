import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../../controllers/add_by_admin/eventController.js";

const router = express.Router();

router.post("/create", createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
