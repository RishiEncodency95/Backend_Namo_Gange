import User from "../../models/user/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../../utils/generateToken.js";
import { generateOtp, sendOtpWhatsapp } from "../../utils/otpService.js";

// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email, status: "Active" });

//   if (!user) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);

//   if (!isMatch) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }

//   const token = generateToken(user);

//   res.json({
//     success: true,
//     token,
//     user: {
//       id: user._id,
//       name: user.first_name + " " + user.last_name,
//       role: user.role,
//     },
//   });
// };
// ===============================
// LOGIN → PASSWORD CHECK + SEND OTP
// ===============================
export const loginWithPassword = async (req, res) => {
  try {
    const { username, mobile, password } = req.body;

    if (!password || (!username && !mobile)) {
      return res.status(400).json({
        message: "Username or Mobile and Password required",
      });
    }

    // find user
    const user = await User.findOne({
      $or: [{ username }, { mobile }],
      status: "Active",
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // generate OTP
    const otp = generateOtp();

    // save otp + expiry (30 sec)
    user.otp = otp;
    user.otp_expires_at = new Date(Date.now() + 1 * 60 * 1000);
    await user.save();

    // send otp
    await sendOtpWhatsapp(user.mobile, otp);

    res.json({
      success: true,
      message: "OTP sent successfully",
      user_id: user._id,
      username: user.username,
    });
  } catch (err) {
    console.error("LOGIN OTP ERROR:", err);
    res.status(500).json({ message: "OTP sending failed" });
  }
};
export const resendOtp = async (req, res) => {
  try {
    const { user_id } = req.body;

    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOtp();

    user.otp = otp;
    user.otp_expires_at = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    await sendOtpWhatsapp(user.mobile, otp);

    res.json({
      success: true,
      message: "OTP resent successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to resend OTP" });
  }
};

export const verifyOtpLogin = async (req, res) => {
  try {
    const { user_id, otp } = req.body;

    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (
      user.otp !== otp ||
      !user.otp_expires_at ||
      user.otp_expires_at < new Date()
    ) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    // clear otp
    user.otp = null;
    user.otp_expires_at = null;
    await user.save();

    const token = generateToken(user);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "OTP verification failed" });
  }
};
