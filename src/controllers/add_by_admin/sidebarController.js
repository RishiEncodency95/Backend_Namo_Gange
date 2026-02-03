import Sidebar from "../../models/add_by_admin/sidebarModel.js";

/* ===============================
   CREATE SIDEBAR
================================ */
export const createSidebar = async (req, res) => {
    try {
        const { label, path, section, icon, parent_menu, order_by, status, created_by } =
            req.body;

        if (!label || !section) {
            return res.status(400).json({
                success: false,
                message: "Label and section are required",
            });
        }
        if (path != "") {
            const existingSidebar = await Sidebar.findOne({ path });
            if (existingSidebar) {
                return res.status(409).json({
                    success: false,
                    message: "Label / Path is already exists",
                });
            }
        }

        const data = await Sidebar.create({
            label,
            path,
            section,
            icon,
            parent_menu,
            order_by,
            status,
            created_by,
        });

        res.status(201).json({
            success: true,
            message: "Sidebar item created successfully",
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
   GET ALL SIDEBARS
================================ */
export const getAllSidebars = async (req, res) => {
    try {
        const data = await Sidebar.find().sort({ createdAt: -1 });

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
   GET SIDEBAR BY ID
================================ */
export const getSidebarById = async (req, res) => {
    try {
        const data = await Sidebar.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Sidebar item not found",
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
   UPDATE SIDEBAR
================================ */
export const updateSidebar = async (req, res) => {
    try {
        const data = await Sidebar.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Sidebar item not found",
            });
        }

        if (req.body.path && req.body.path !== data.path) {
            const existingSidebar = await Sidebar.findOne({ path: req.body.path });
            if (existingSidebar) {
                return res.status(409).json({
                    success: false,
                    message: "A sidebar item with this path already exists",
                });
            }
        }

        data.label = req.body.label ?? data.label;
        data.path = req.body.path ?? data.path;
        data.section = req.body.section ?? data.section;
        data.icon = req.body.icon ?? data.icon;
        data.parent_menu = req.body.parent_menu ?? data.parent_menu;
        data.order_by = req.body.order_by ?? data.order_by;
        data.status = req.body.status ?? data.status
        data.updated_by = req.body.updated_by ?? data.updated_by;

        await data.save();

        res.status(200).json({
            success: true,
            message: "Sidebar item updated successfully",
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
   DELETE SIDEBAR
================================ */
export const deleteSidebar = async (req, res) => {
    try {
        const data = await Sidebar.findByIdAndDelete(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Sidebar item not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Sidebar item deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};