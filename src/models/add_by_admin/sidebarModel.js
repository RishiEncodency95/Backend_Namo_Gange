import mongoose from "mongoose";

const sidebarSchema = new mongoose.Schema(
    {
        label: {
            type: String,
            required: true,
            trim: true,
        },

        path: {
            type: String,
            trim: true,
            required: false,
        },

        section: {
            type: String,
            trim: true,
            required: true,
        },
        icon: {
            type: String,
            trim: true,
            required: false,
        },
        parent_menu: {
            type: String,
            trim: true,
            default: null,
        },
        order_by: {
            type: Number,
            default: 0,
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

export default mongoose.model("Sidebar", sidebarSchema);