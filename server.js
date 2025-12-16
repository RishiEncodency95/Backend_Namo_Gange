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
import categoryImageRoutes from "./src/routes/add_by_admin/categoryImageRoutes.js";
import categoryVideoRoutes from "./src/routes/add_by_admin/categoryVideoRoutes.js";
import statusOptionRoutes from "./src/routes/add_by_admin/statusOptionRoutes.js";
import blogRoutes from "./src/routes/blog/blogRoutes.js";

const app = express();

// --- FIXED CORS ----
// const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];
const allowedOrigins = [
  "https://admin-namo-gange.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/banner", bannerRoutes);
app.use("/api/v1/galleryImage", galleryImageRoutes);
app.use("/api/v1/gallery-video", galleryVideoRoutes);
app.use("/api/v1/initiatives", initiativeRoutes);
app.use("/api/v1/category-image", categoryImageRoutes);
app.use("/api/v1/category-video", categoryVideoRoutes);
app.use("/api/v1/status-option", statusOptionRoutes);
app.use("/api/v1/blog", blogRoutes);
app.get("/", (req, res) => res.send("Server Running"));

// Server start
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
