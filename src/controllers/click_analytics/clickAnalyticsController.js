import ClickAnalytics from "../../models/click_analytics/ClickAnalyticsModel.js";

/* ================= CREATE ================= */
export const createClickAnalytics = async (req, res) => {
    try {
        const { iconName } = req.body;
        if (!iconName) {
            return res.status(400).json({
                success: false,
                message: "iconName is required"
            });
        }

        const ipAddress = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

        const newLog = await ClickAnalytics.create({
            iconName,
            ipAddress,
            created_by: req.userId || "Visitor",
        });

        res.status(201).json({
            success: true,
            message: "Click logged successfully",
            data: newLog,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/* ================= GET ALL (WITH STATS) ================= */
export const getAllClickAnalytics = async (req, res) => {
    try {
        // 1. Get stats using aggregation
        const statsResult = await ClickAnalytics.aggregate([
            {
                $group: {
                    _id: "$iconName",
                    count: { $sum: 1 },
                },
            },
        ]);

        // Format stats for response with default values
        const stats = {
            total: 0,
            whatsapp: 0,
            facebook: 0,
            instagram: 0,
            twitter: 0,
            linkedin: 0,
            youtube: 0,
        };

        statsResult.forEach((item) => {
            const lowerName = item._id.toLowerCase();
            stats[lowerName] = item.count;
            stats.total += item.count;
        });

        // 2. Get recent logs (sorted latest to oldest)
        const logs = await ClickAnalytics.find()
            .sort({ createdAt: -1 })
            .limit(100);

        res.status(200).json({
            success: true,
            data: {
                stats,
                logs,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/* ================= GET BY ID ================= */
export const getClickAnalyticsById = async (req, res) => {
    try {
        const data = await ClickAnalytics.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ success: false, message: "Not found" });
        }
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/* ================= UPDATE ================= */
export const updateClickAnalytics = async (req, res) => {
    try {
        const data = await ClickAnalytics.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ success: false, message: "Not found" });
        }

        const updated = await ClickAnalytics.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                updated_by: req.userId,
            },
            { new: true },
        );

        res.json({
            success: true,
            message: "Updated successfully",
            data: updated,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/* ================= DELETE ================= */
export const deleteClickAnalytics = async (req, res) => {
    try {
        const data = await ClickAnalytics.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ success: false, message: "Not found" });
        }

        await data.deleteOne();
        res.json({ success: true, message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
