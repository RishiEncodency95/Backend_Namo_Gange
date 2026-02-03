import mongoose from "mongoose";

const ipSchema = new mongoose.Schema(
    {
        ip_name: {
            type: String,
            required: true,
            trim: true,
        },

        ip_address: {
            type: String,
            trim: true,
            default: "",
        },

        remark: {
            type: String,
            trim: true,
            required: false,
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

export default mongoose.model("IP", ipSchema);