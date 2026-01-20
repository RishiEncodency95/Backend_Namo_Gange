import express from "express";
import {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
} from "../../controllers/add_by_admin/organizationController.js";

const router = express.Router();

router.post("/create", createOrganization);   // Create
router.get("/", getAllOrganizations);         // Get all
router.get("/:id", getOrganizationById);      // Get by ID
router.put("/:id", updateOrganization);       // Update
router.delete("/:id", deleteOrganization);    // Delete

export default router;
