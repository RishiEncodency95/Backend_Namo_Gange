import express from "express";
import upload from "../../utils/multer.js";
import { createVolunteer, getAllVolunteers, getVolunteerById, updateVolunteer, deleteVolunteer } from "../../controllers/volunteer/volunteerController.js";

const router = express.Router();

router.post("/create", upload.single("profile_image"), createVolunteer);
router.get("/", getAllVolunteers);  
router.get("/:id", getVolunteerById);
router.delete("/:id", deleteVolunteer);
router.put("/:id", upload.single("profile_image"), updateVolunteer);

export default router;