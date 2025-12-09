// LOAD ENV FIRST — MUST BE FIRST LINE
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import bannerRoutes from "./src/routes/bannerRoutes.js";
import galleryImageRoutes from "./src/routes/galleryImageRoutes.js";
import galleryVideoRoutes from "./src/routes/galleryVideoRoutes.js";
import initiativeRoutes from "./src/routes/initiativeRoutes.js";

// Now env is available
// console.log("DEBUG CLOUDINARY:", {
//   NAME: process.env.CLOUDINARY_NAME,
//   KEY: process.env.CLOUDINARY_API_KEY,
//   SECRET: process.env.CLOUDINARY_API_SECRET,
// });

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/banner", bannerRoutes);
app.use("/api/v1/galleryImage", galleryImageRoutes);
app.use("/api/v1/gallery-video", galleryVideoRoutes);
app.use("/api/v1/initiatives", initiativeRoutes);
app.get("/", (req, res) => res.send("Server Running"));

// Server start
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
