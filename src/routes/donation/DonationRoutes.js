import express from "express";
import {
  createDonation,
  getAllDonations,
  getDonationById,
  updateDonation,
  deleteDonation,
} from "../../controllers/donation/DonationController.js";

const router = express.Router();

router.route("/").get(getAllDonations).post(createDonation);
router
  .route("/:id")
  .get(getDonationById)
  .put(updateDonation)
  .delete(deleteDonation);

export default router;
