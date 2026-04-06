import express from "express";
import { sendEmailOtp, sendMobileOtp, verifyOtp } from "../controllers/otpController.js";

const router = express.Router();

// Define routes for sending and verifying OTPs
router.post("/send-email-otp", sendEmailOtp);
router.post("/send-mobile-otp", sendMobileOtp);
router.post("/verify-otp", verifyOtp);

export default router;
