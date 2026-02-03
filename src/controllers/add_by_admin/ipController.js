import IP from "../../models/add_by_admin/ipModel.js";

/* ===============================
   CREATE IP
================================ */
export const createIP = async (req, res) => {
    try {
        const { ip_name, ip_address, remark, status, created_by } = req.body;

        if (!ip_name) {
            return res.status(400).json({
                success: false,
                message: "IP name are required",
            });
        }

        const existingIP = await IP.findOne({
            $or: [{ ip_name }, ...(ip_address ? [{ ip_address }] : [])],
        });

        if (existingIP) {
            return res.status(409).json({
                success: false,
                message: "IP name or IP address already exists",
            });
        }

        const data = await IP.create({
            ip_name,
            ip_address,
            remark,
            status,
            created_by,
        });

        res.status(201).json({
            success: true,
            message: "IP created successfully",
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ===============================
   GET ALL IPS
================================ */
export const getAllIPs = async (req, res) => {
    try {
        const data = await IP.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ===============================
   GET IP BY ID
================================ */
export const getIPById = async (req, res) => {
    try {
        const data = await IP.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "IP not found",
            });
        }

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ===============================
   UPDATE IP
================================ */
export const updateIP = async (req, res) => {
    try {
        const data = await IP.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "IP not found",
            });
        }

        const newIpName = req.body.ip_name ?? data.ip_name;
        const newIpAddress = req.body.ip_address ?? data.ip_address;

        if (req.body.ip_name || req.body.ip_address) {
            const existingIP = await IP.findOne({
                $or: [
                    { ip_name: newIpName },
                    ...(newIpAddress ? [{ ip_address: newIpAddress }] : []),
                ],
                _id: { $ne: req.params.id },
            });

            if (existingIP) {
                return res.status(409).json({
                    success: false,
                    message: "IP name or IP address already exists",
                });
            }
        }

        data.ip_name = req.body.ip_name ?? data.ip_name;
        data.ip_address = req.body.ip_address ?? data.ip_address;
        data.remark = req.body.remark ?? data.remark;
        data.status = req.body.status ?? data.status;
        data.updated_by = req.body.updated_by ?? data.updated_by;

        await data.save();

        res.status(200).json({
            success: true,
            message: "IP updated successfully",
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ===============================
   DELETE IP
================================ */
export const deleteIP = async (req, res) => {
    try {
        const data = await IP.findByIdAndDelete(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "IP not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "IP deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};