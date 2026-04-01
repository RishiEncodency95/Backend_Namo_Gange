import express from "express";
import {
  createClickAnalytics,
  getAllClickAnalytics,
  getClickAnalyticsById,
  updateClickAnalytics,
  deleteClickAnalytics,
} from "../../controllers/click_analytics/clickAnalyticsController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", createClickAnalytics);
router.get("/", getAllClickAnalytics);
router.get("/:id", getClickAnalyticsById);
router.put("/:id", authMiddleware, updateClickAnalytics);
router.delete("/:id", authMiddleware, deleteClickAnalytics);

export default router;
