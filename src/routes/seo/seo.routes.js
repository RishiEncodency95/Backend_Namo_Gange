import express from "express";
import {
  createSeo,
  getAllSeo,
  getSeoByPath,
  getSeoById,
  updateSeo,
  deleteSeo,
} from "../../controllers/seo/seo.controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createSeo);
router.get("/", getAllSeo);
router.get("/page/:path", getSeoByPath);
router.get("/:id", getSeoById);
router.put("/:id", authMiddleware, updateSeo);
router.delete("/:id", authMiddleware, deleteSeo);

export default router;
