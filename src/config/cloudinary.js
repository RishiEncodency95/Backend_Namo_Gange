import dotenv from "dotenv";
dotenv.config(); // FIX: load env inside cloudinary too

import { v2 as cloudinary } from "cloudinary";

// console.log("CLOUDINARY FILE ENV:", {
//   NAME: process.env.CLOUDINARY_NAME,
//   KEY: process.env.CLOUDINARY_API_KEY,
//   SECRET: process.env.CLOUDINARY_API_SECRET,
// });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
