import mongoose from "mongoose";
import slugify from "slugify";

const NewsLetterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    monthYear: {
      type: String,
      required: true,
    },

    order_by: {
      type: Number,
      default: 0,
    },

    image: {
      type: String,
      required: true,
    },
    image_alt: {
      type: String,
    },

    pdf: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

/* ✅ SAFE PRE-SAVE HOOK (NO next) */
NewsLetterSchema.pre("save", function () {
  if (!this.slug) {
    this.slug = slugify(`${this.title}-${this.monthYear}`, {
      lower: true,
      strict: true,
    });
  }
});

export default mongoose.model("NewsLetter", NewsLetterSchema);
