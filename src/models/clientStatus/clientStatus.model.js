import mongoose from "mongoose";

const clientStatusSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    selected_status: {
      type: String,
      required: true,
    },

    selected_event: {
      type: String,
      required: true,
    },

    previous_status: {
      type: String,
      default: null,
    },

    desc: {
      type: String,
      trim: true,
    },

    reminder_date_time: {
      type: Date,
      default: null,
    },

    created_by: {
      type: String,
      ref: "User",
    },

    updated_by: {
      type: String,
      ref: "User",
    },
  },
  { timestamps: true }
);

const ClientStatus = mongoose.model("ClientStatus", clientStatusSchema);

export default ClientStatus;
