import Support from "../../models/support/SupportModel.js";

/* =============================== CREATE Support LIST ================================ */
export const createSupport = async (req, res) => {
    try {
        const {
            name,
            email,
            mobile,
            gender,
            dob,
            supportType,
            fullAddress,
            state,
            city,
            prefferedContribution,
            message,
        } = req.body;

        // Basic validation
        if (
            !name ||
            !email ||
            !mobile ||
            !gender ||
            !dob ||
            !supportType ||
            !fullAddress ||
            !state ||
            !city ||
            !prefferedContribution ||
            !message
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const newSupport = await Support.create(req.body);

        res.status(201).json({
            success: true,
            message: "Support submitted successfully",
            data: newSupport,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/* =============================== GET ALL SUPPORT LISTS ================================ */
export const getAllSupports = async (req, res) => {
    try {
        const supports = await Support.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: supports,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/* =============================== GET SUPPORT LIST BY ID ================================ */
export const getSupportById = async (req, res) => {
    try {
        const support = await Support.findById(req.params.id);
        if (!support) {
            return res.status(404).json({
                success: false,
                message: "Support not found",
            });
        }
        res.status(200).json({
            success: true,
            data: support,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/* =============================== UPDATE Support ================================ */
export const updateSupport = async (req, res) => {
    try {
        const updatedSupport = await Support.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedSupport) {
            return res.status(404).json({
                success: false,
                message: "Support not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Support updated successfully",
            data: updatedSupport,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/* =============================== DELETE SUPPORT ======================= */
export const deleteSupport = async (req, res) => {
    try {
        const deletedSupport = await Support.findByIdAndDelete(req.params.id);

        if (!deletedSupport) {
            return res.status(404).json({
                success: false,
                message: "Support not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Support deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};