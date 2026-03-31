import express from "express";
import {
  upsertSocialMedia,
  getSocialMedia,
  deleteSocialMedia,
} from "../../controllers/seo/socialMediaController.js";

const router = express.Router();

router.post("/upsert", upsertSocialMedia);
router.get("/get", getSocialMedia);
router.delete("/delete", deleteSocialMedia);

export default router;
