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
import sourceRoutes from "./src/routes/add_by_admin/sourceRoutes.js";
import callTargetRoutes from "./src/routes/add_by_admin/callTargetRoutes.js";
import coordinatorRoutes from "./src/routes/add_by_admin/coordinatorStatusRoutes.js";
import bankRoutes from "./src/routes/add_by_admin/bankRoutes.js";
import publishedRoutes from "./src/routes/add_by_admin/publishedRoutes.js";
import recentUpdateRoutes from "./src/routes/recent-update/recentUpdateRoutes.js";
import newsLetterRoutes from "./src/routes/newsletters/newsLetterroutes.js";
import enquiryListRoutes from "./src/routes/enquiry_list/enquiryListRoutes.js";
import supportRoutes from "./src/routes/support/supportRoutes.js";
import ipRoutes from "./src/routes/add_by_admin/ipRoutes.js";
import roleRoutes from "./src/routes/add_by_admin/roleRoutes.js";
import sidebarRoutes from "./src/routes/add_by_admin/sidebarRoutes.js";
import roleRightsRoutes from "./src/routes/role_rights/roleRightsRoutes.js";
import volunteerRoutes from "./src/routes/volunteer/volunteerRoutes.js";
import agsRouters from "./src/routes/ags/agsDelegateRoutes.js";
import agsEventRoutes from "./src/routes/add_by_admin/agsEventRoutes.js";
import collegeRoutes from "./src/routes/college/collegeRoutes.js";
import clientStatusRoutes from "./src/routes/clientStatus/clientStatus.routes.js";
import agsPaymentRoutes from "./src/routes/ags/agsPayment.routes.js";
import seoRoutes from "./src/routes/seo/seo.routes.js";
import heroRoutes from "./src/routes/hero/heroRoutes.js";
import aboutRoutes from "./src/routes/about_us/aboutRoutes.js";
import seoCodeRoutes from "./src/routes/seo/seoCode.routes.js";

const app = express();

// --- FIXED CORS ---- code

const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];
// const allowedOrigins = [
//   "https://admin-namo-gange.vercel.app",
//   "http://localhost:5173",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   }),
// );
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.some((o) => origin.startsWith(o))) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  }),
);
app.use(cors());
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
app.use("/api/v1/trust-bodies", trustbodyRoutes);
app.use("/api/v1/category-image", categoryImageRoutes);
app.use("/api/v1/category-video", categoryVideoRoutes);
app.use("/api/v1/status-option", statusOptionRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/faq", faqRoutes);
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
app.use("/api/v1/sources", sourceRoutes);
app.use("/api/v1/call-target", callTargetRoutes);
app.use("/api/v1/coordinator-status", coordinatorRoutes);
app.use("/api/v1/banks", bankRoutes);
app.use("/api/v1/published", publishedRoutes);
app.use("/api/v1/recent-updates", recentUpdateRoutes);
app.use("/api/v1/newsletters", newsLetterRoutes);
app.use("/api/v1/enquire-list", enquiryListRoutes);
app.use("/api/v1/support", supportRoutes);
app.use("/api/v1/ip", ipRoutes);
app.use("/api/v1/role", roleRoutes);
app.use("/api/v1/sidebar", sidebarRoutes);
app.use("/api/v1/role-rights", roleRightsRoutes);
app.use("/api/v1/volunteers", volunteerRoutes);
app.use("/api/v1/ags-delegates", agsRouters);
app.use("/api/v1/ags-events", agsEventRoutes);
app.use("/api/v1/colleges", collegeRoutes);
app.use("/api/v1/client-status", clientStatusRoutes);
app.use("/api/v1/ags-payment", agsPaymentRoutes);
app.use("/api/v1/seo", seoRoutes);
app.use("/api/v1/heroes", heroRoutes);
app.use("/api/v1/about-us", aboutRoutes);
app.use("/api/v1/seo-code", seoCodeRoutes);

app.get("/", (req, res) => res.send("Server Running"));

// Server start
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
