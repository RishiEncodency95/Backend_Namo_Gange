import Donation from "../../models/donation/DonationModel.js";

// @desc    Create new donation
// @route   POST /api/v1/donations
// @access  Public
export const createDonation = async (req, res) => {
  try {
    const donation = await Donation.create(req.body);
    res.status(201).json({
      success: true,
      data: donation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all donations
// @route   GET /api/v1/donations
// @access  Private (Admin)
export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: donations.length,
      data: donations,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single donation
// @route   GET /api/v1/donations/:id
// @access  Private (Admin)
export const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }
    res.status(200).json({
      success: true,
      data: donation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update donation
// @route   PUT /api/v1/donations/:id
// @access  Private (Admin)
export const updateDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }
    res.status(200).json({
      success: true,
      data: donation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete donation
// @route   DELETE /api/v1/donations/:id
// @access  Private (Admin)
export const deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
