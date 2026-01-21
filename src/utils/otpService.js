import axios from "axios";

// OTP generate
export const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP on WhatsApp/SMS
export const sendOtpWhatsapp = async (mobile, otp) => {
  const msg = `Your Namo Gange Trust login OTP is ${otp}. Valid for 30 seconds.`;

  const url = `http://api.opustechnology.in/wapp/v2/api/send?apikey=${
    process.env.OPUS_API_KEY
  }&mobile=${mobile}&msg=${encodeURIComponent(msg)}`;

  await axios.get(url);
};
