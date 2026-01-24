// LOAD ENV FIRST — MUST BE FIRST LINE
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import activityLogRoutes from "./src/routes/activity/activityLogRoutes.js";
// import adminRoutes from "./src/routes/adminRoutes.js";
import bannerRoutes from "./src/routes/home_banner/bannerRoutes.js";
import galleryImageRoutes from "./src/routes/galleryImageRoutes.js";
import galleryVideoRoutes from "./src/routes/galleryVideoRoutes.js";
import trustbodyRoutes from "./src/routes/trustbodies/trustBodyroutes.js";
import newsLetterRoutes from "./src/routes/newsletters/newsLetterroutes.js";
import categoryImageRoutes from "./src/routes/add_by_admin/categoryImageRoutes.js";
import categoryVideoRoutes from "./src/routes/add_by_admin/categoryVideoRoutes.js";
import statusOptionRoutes from "./src/routes/add_by_admin/statusOptionRoutes.js";
import blogRoutes from "./src/routes/blog/blogRoutes.js";
import faqRoutes from "./src/routes/faqs/faqroutes.js";
import memberRoutes from "./src/routes/membership/memberRoutes.js";
import categoryRoutes from "./src/routes/add_by_admin/categoryRoutes.js";
import occupationRoutes from "./src/routes/add_by_admin/occupationRoutes.js";
import designationRoutes from "./src/routes/add_by_admin/designationRoutes.js";
import departmentRoutes from "./src/routes/add_by_admin/departmentRoutes.js";
import professionRoutes from "./src/routes/add_by_admin/professionRoutes.js";
import universityRoutes from "./src/routes/add_by_admin/universityRoutes.js";
import enquiryRoutes from "./src/routes/add_by_admin/enquiryRoutes.js";
import dataRoutes from "./src/routes/add_by_admin/dataRoutes.js";
import objectiveRoutes from "./src/routes/objective/objectiveRoutes.js";
import objNameRoutes from "./src/routes/add_by_admin/objNameRoutes.js";
import initiativeRoutes from "./src/routes/initiative/initiativeRoutes.js";
import testimonialRoutes from "./src/routes/testimonial/testimonialRoutes.js";
import achievementRoutes from "./src/routes/achievement/achievementRoutes.js";
import organizationRoutes from "./src/routes/add_by_admin/organizationRoutes.js";
import eventRoutes from "./src/routes/add_by_admin/eventRoutes.js";
import userRoutes from "./src/routes/user/userRoutes.js";
import authRoutes from "./src/routes/auth/authRoutes.js";

const app = express();

// --- FIXED CORS ---- code

const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];
// const allowedOrigins = [
//   "https://admin-namo-gange.vercel.app",
//   "http://localhost:5173",
// ];

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
app.use("/api/v1/activity-logs", activityLogRoutes);
// app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/banner", bannerRoutes);
app.use("/api/v1/galleryImage", galleryImageRoutes);
app.use("/api/v1/gallery-video", galleryVideoRoutes);
app.use("/api/v1/trustbodies",trustbodyRoutes);
app.use("/api/v1/newsLetter",newsLetterRoutes);
app.use("/api/v1/category-image", categoryImageRoutes);
app.use("/api/v1/category-video", categoryVideoRoutes);
app.use("/api/v1/status-option", statusOptionRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/faq",faqRoutes);
app.use("/api/v1/members", memberRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/occupations", occupationRoutes);
app.use("/api/v1/designations", designationRoutes);
app.use("/api/v1/departments", departmentRoutes);
app.use("/api/v1/professions", professionRoutes);
app.use("/api/v1/universities", universityRoutes);
app.use("/api/v1/enquiries", enquiryRoutes);
app.use("/api/v1/data", dataRoutes);
app.use("/api/v1/objectives", objectiveRoutes);
app.use("/api/v1/obj-name", objNameRoutes);
app.use("/api/v1/initiatives", initiativeRoutes);
app.use("/api/v1/testimonials", testimonialRoutes);
app.use("/api/v1/achievements", achievementRoutes);
app.use("/api/v1/organization", organizationRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => res.send("Server Running"));

// Server start
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
