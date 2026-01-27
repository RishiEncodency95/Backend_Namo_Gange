import mongoose from "mongoose";

const { Schema, model } = mongoose;

const EnquiryListSchema = new Schema(
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

export default model("EnquiryList", EnquiryListSchema); 