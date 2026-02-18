import mongoose from "mongoose";

const agsPaymentSchema = new mongoose.Schema(
  {
    registration_no: {
      type: String,
      unique: true,
    },

    paymentFor: String,
    Seminar_day: String,
    adhar_noORpan_no: String,
    amount: Number,

    paymentMode: String,

    bank_name: String,
    cheque_no: String,
    date_Of_issue: Date,
    branch: String,

    paytm_no: String,
    transaction_id: String,
    UPI_ID: String,

    bank_Reference_No: String,
    order_no: String,

client_id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Client",
},

    payment_status: { 
      type: String,
      enum: ["Active", "Cancelled"],
      default: "Active",
    },

    created_by: {
      type: String,
      ref: "User",
      required: true,
    },

    updated_by: {
      type: String,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AgsPayment", agsPaymentSchema);
