import express from "express";
import upload from "../../utils/multer.js";
import {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
} from "../../controllers/membership/memberController.js";

const router = express.Router();

router.post("/create", upload.single("profile_image"), createMember);
router.get("/", getAllMembers);
router.get("/:id", getMemberById);
router.put("/:id", upload.single("profile_image"), updateMember);
router.delete("/:id", deleteMember);

export default router;
