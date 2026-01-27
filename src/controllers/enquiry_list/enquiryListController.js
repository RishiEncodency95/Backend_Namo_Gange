import EnquiryList from "../../models/enquiry_list/EnquiryListModel.js";

/* =============================== CREATE ENQUIRY LIST ================================ */
export const createEnquiryList = async (req, res) => {
    try {
        const {
            name,
            email,
            mobile,
            message,
        } = req.body;

        // Basic validation
        if (
            !name ||
            !email ||
            !mobile ||
            !message
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const newEnquiry = await EnquiryList.create(req.body);

        res.status(201).json({
            success: true,
            message: "Enquiry submitted successfully",
            data: newEnquiry,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/* =============================== GET ALL ENQUIRY LISTS ================================ */
export const getAllEnquiryLists = async (req, res) => {
    try {
        const enquiries = await EnquiryList.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: enquiries,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/* =============================== GET ENQUIRY LIST BY ID ================================ */
export const getEnquiryListById = async (req, res) => {
    try {
        const enquiry = await EnquiryList.findById(req.params.id);
        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found",
            });
        }
        res.status(200).json({
            success: true,
            data: enquiry,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/* =============================== UPDATE ENQUIRY LIST ================================ */
export const updateEnquiryList = async (req, res) => {
    try {
        const updatedEnquiry = await EnquiryList.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedEnquiry) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Enquiry updated successfully",
            data: updatedEnquiry,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/* =============================== DELETE ENQUIRY LIST ======================= */
export const deleteEnquiryList = async (req, res) => {
    try {
        const deletedEnquiry = await EnquiryList.findByIdAndDelete(req.params.id);

        if (!deletedEnquiry) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Enquiry deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};