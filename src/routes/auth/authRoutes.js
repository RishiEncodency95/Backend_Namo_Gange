// import express from "express";
// import { loginUser } from "../../controllers/auth/authController.js";

// const router = express.Router();

// router.post("/login", loginUser);

// export default router;

import express from "express";
import {
  loginWithPassword,
  resendOtp,
  verifyOtpLogin,
} from "../../controllers/auth/authController.js";

const router = express.Router();

router.post("/login", loginWithPassword);
router.post("/resend-otp", resendOtp);
router.post("/verify-otp", verifyOtpLogin);

export default router;
