import axios from "axios";
import nodemailer from "nodemailer";

// SMTP Transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// OTP generate
export const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP on WhatsApp
export const sendOtpWhatsapp = async (mobile, otp) => {
  const msg = `Your Namo Gange Trust login OTP is ${otp}. Valid for 30 seconds.`;

  const url = `http://api.opustechnology.in/wapp/v2/api/send?apikey=${process.env.OPUS_API_KEY
    }&mobile=${mobile}&msg=${encodeURIComponent(msg)}`;

  await axios.get(url);
};

// Send OTP via Email
export const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: "OTP Verification - Namo Gange Trust",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #DF562C; text-align: center;">Namo Gange Trust</h2>
        <p>Dear User,</p>
        <p>Your OTP for verification is:</p>
        <div style="text-align: center; margin: 20px 0;">
          <h1 style="background: #fff9f4; color: #f1a06a; display: inline-block; padding: 10px 40px; border: 2px dashed #fca5a5; border-radius: 5px; letter-spacing: 5px;">${otp}</h1>
        </div>
        <p>This OTP is valid for <strong>5 minutes</strong>. Please do not share this OTP with anyone.</p>
        <p>Best regards,<br/>Team Namo Gange Trust</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
