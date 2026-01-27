// routes/newsletter/newsLetterRoutes.js
import express from "express";
import upload from "../../utils/multer.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import {
  createNewsLetter,
  getAllNewsLetters,
  getNewsLetterById,
  updateNewsLetter,
  deleteNewsLetter,
} from "../../controllers/newsletters/newsLettercontroller.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  createNewsLetter
);

router.get("/", getAllNewsLetters);
router.get("/:id", getNewsLetterById);

router.put(
  "/:id",
  authMiddleware,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  updateNewsLetter
);

router.delete("/:id", authMiddleware, deleteNewsLetter);

export default router;
