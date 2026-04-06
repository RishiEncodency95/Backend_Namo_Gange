import { generateOtp, sendOtpWhatsapp, sendOtpEmail } from "../utils/otpService.js";
import OTP from "../models/otp/OTPModel.js";

/**
 * Send OTP via Email
 */
export const sendEmailOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: "Email is required" });

  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  try {
    // Save to DB
    await OTP.findOneAndUpdate(
      { email },
      { email, otp, expiresAt, verified: false },
      { upsert: true, new: true }
    );

    // Send Real Email
    await sendOtpEmail(email, otp);

    res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.error("Email OTP Error:", error);
    res.status(500).json({ success: false, message: "Failed to send email OTP" });
  }
};

/**
 * Send OTP via WhatsApp
 */
export const sendMobileOtp = async (req, res) => {
  const { mobile } = req.body;
  if (!mobile) return res.status(400).json({ success: false, message: "Mobile number is required" });

  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  try {
    // Save to DB
    await OTP.findOneAndUpdate(
      { mobile },
      { mobile, otp, expiresAt, verified: false },
      { upsert: true, new: true }
    );

    // Send Real WhatsApp
    await sendOtpWhatsapp(mobile, otp);

    res.json({ success: true, message: "OTP sent to your WhatsApp" });
  } catch (error) {
    console.error("WhatsApp OTP Error:", error);
    res.status(500).json({ success: false, message: "Failed to send WhatsApp OTP" });
  }
};

/**
 * Verify OTP
 */
export const verifyOtp = async (req, res) => {
  const { email, mobile, otp } = req.body;
  
  try {
    const query = mobile ? { mobile } : { email };
    const otpRecord = await OTP.findOne({ ...query, otp });

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (new Date() > otpRecord.expiresAt) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    // Mark as verified
    otpRecord.verified = true;
    await otpRecord.save();

    res.json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.status(500).json({ success: false, message: "Verification failed" });
  }
};
