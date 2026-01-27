import express from "express";
import upload from "../../utils/multer.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import {
  createRecentUpdate,
  getAllRecentUpdates,
  updateRecentUpdate,
  deleteRecentUpdate,
} from "../../controllers/recent-update/recentUpdateController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createRecentUpdate
);

router.get("/", getAllRecentUpdates);

router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateRecentUpdate
);

router.delete("/:id", authMiddleware, deleteRecentUpdate);

export default router;
