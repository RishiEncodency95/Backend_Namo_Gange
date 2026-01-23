import express from "express";
import {
  createNewsLetter,
  getAllNewsLetters,
  getNewsLetter,
  updateNewsLetter,
  deleteNewsLetter,
  toggleNewsLetterStatus,
} from "../../controllers/newsletters/newsLettercontroller.js";

import upload from "../../utils/multer.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

/* ADMIN */
router.post(
  "/",
  // authMiddleware,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  createNewsLetter
);

router.put(
  "/:id",
  // authMiddleware,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  updateNewsLetter
);

router.delete("/:id", /* authMiddleware, */ deleteNewsLetter);
router.patch("/:id/status", /* authMiddleware, */ toggleNewsLetterStatus);

/* PUBLIC */
router.get("/", getAllNewsLetters);
router.get("/:id", getNewsLetter);

export default router;
