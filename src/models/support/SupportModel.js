import mongoose from "mongoose";

const { Schema, model } = mongoose;

const SupportSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: true,
        },
        dob: { type: Date, required: true },
        supportType: {
            type: String,
            required: true,
        },
        fullAddress: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        prefferedContribution: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
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
    {
        timestamps: true,
    }
);

export default model("Support", SupportSchema); 