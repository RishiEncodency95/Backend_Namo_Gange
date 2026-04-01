import mongoose from "mongoose";

const clickAnalyticsSchema = new mongoose.Schema(
    {
        iconName: {
            type: String,
            required: [true, "Icon name is required"],
        },
        ipAddress: {
            type: String,
            required: true,
        },
        clickedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true },
);

export default mongoose.model("ClickAnalytics", clickAnalyticsSchema);
