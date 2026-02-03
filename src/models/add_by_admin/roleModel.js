import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            required: true,
            trim: true,
        },

        role_name: {
            type: String,
            trim: true,
            default: "",
        },

        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active",
        },

        created_by: {
            type: String,
            default: null,
        },

        updated_by: {
            type: String,
            default: null,
        },
    },
    { timestamps: true } // createdAt, updatedAt
);

export default mongoose.model("Role", roleSchema);