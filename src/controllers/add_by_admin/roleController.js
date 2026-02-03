import Role from "../../models/add_by_admin/roleModel.js";

/* ===============================
   CREATE ROLE
================================ */
export const createRole = async (req, res) => {
    try {
        const { role, role_name, status, created_by } = req.body;

        if (!role) {
            return res.status(400).json({
                success: false,
                message: "Role is required",
            });
        }

        const existingRole = await Role.findOne({
            $or: [{ role }, ...(role_name ? [{ role_name }] : [])],
        });

        if (existingRole) {
            return res.status(409).json({
                success: false,
                message: "Role or Role Name already exists",
            });
        }

        const data = await Role.create({
            role,
            role_name,
            status,
            created_by,
        });

        res.status(201).json({
            success: true,
            message: "Role created successfully",
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
   GET ALL ROLES
================================ */
export const getAllRoles = async (req, res) => {
    try {
        const data = await Role.find().sort({ createdAt: -1 });

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
   GET ROLE BY ID
================================ */
export const getRoleById = async (req, res) => {
    try {
        const data = await Role.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Role not found",
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
   UPDATE ROLE
================================ */
export const updateRole = async (req, res) => {
    try {
        const data = await Role.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Role not found",
            });
        }

        const newRole = req.body.role ?? data.role;
        const newRoleName = req.body.role_name ?? data.role_name;

        if (req.body.role || req.body.role_name) {
            const existingRole = await Role.findOne({
                $or: [
                    { role: newRole },
                    ...(newRoleName ? [{ role_name: newRoleName }] : []),
                ],
                _id: { $ne: req.params.id },
            });

            if (existingRole) {
                return res.status(409).json({
                    success: false,
                    message: "Role or Role Name already exists",
                });
            }
        }

        data.role = req.body.role ?? data.role;
        data.role_name = req.body.role_name ?? data.role_name;
        data.status = req.body.status ?? data.status;
        data.updated_by = req.body.updated_by ?? data.updated_by;

        await data.save();

        res.status(200).json({
            success: true,
            message: "Role updated successfully",
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
   DELETE ROLE
================================ */
export const deleteRole = async (req, res) => {
    try {
        const data = await Role.findByIdAndDelete(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Role not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Role deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};