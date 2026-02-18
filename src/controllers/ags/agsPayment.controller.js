import AgsPayment from "../../models/ags/agsPayment.model.js";

/* ================= DAY CODE MAP ================= */

const dayCodeMap = {
  "For 1st Day": "01",
  "For 2nd Day": "02",
  "For 3rd Day": "03",
  "For All Days": "04",
};

/* ================= CREATE ================= */

export const createAgsPayment = async (req, res) => {
  try {
    const { Seminar_day, created_by } = req.body;

    if (!Seminar_day) {
      return res.status(400).json({
        success: false,
        message: "Seminar day is required",
      });
    }

    if (!created_by) {
      return res.status(400).json({
        success: false,
        message: "created_by is required",
      });
    }

    const dayCode = dayCodeMap[Seminar_day];

    if (!dayCode) {
      return res.status(400).json({
        success: false,
        message: "Invalid Seminar Day",
      });
    }

    // 🔥 Find last receipt of same day
    const lastPayment = await AgsPayment.findOne({
      registration_no: { $regex: `^AGS/15th/${dayCode}/` },
    }).sort({ registration_no: -1 });

    let newNumber = 1;

    if (lastPayment) {
      const lastSeq = parseInt(lastPayment.registration_no.split("/")[3]);
      if (!isNaN(lastSeq)) {
        newNumber = lastSeq + 1;
      }
    }

    const paddedNumber = String(newNumber).padStart(3, "0");

    const registration_no = `AGS/15th/${dayCode}/${paddedNumber}`;

    const payment = await AgsPayment.create({
      ...req.body,
      registration_no,
    });

    res.status(201).json({
      success: true,
      message: "Payment created successfully",
      data: payment,
    });
  } catch (error) {
    // 🔥 Fix for duplicate key error on old 'receipt_no' index
    if (error.code === 11000 && error.message.includes("receipt_no_1")) {
      await AgsPayment.collection.dropIndex("receipt_no_1");

      const dayCode = dayCodeMap[req.body.Seminar_day];
      const lastPayment = await AgsPayment.findOne({
        registration_no: { $regex: `^AGS/15th/${dayCode}/` },
      }).sort({ registration_no: -1 });

      let newNumber = 1;
      if (lastPayment) {
        const lastSeq = parseInt(lastPayment.registration_no.split("/")[3]);
        if (!isNaN(lastSeq)) newNumber = lastSeq + 1;
      }
      const paddedNumber = String(newNumber).padStart(3, "0");
      const registration_no = `AGS/15th/${dayCode}/${paddedNumber}`;

      const payment = await AgsPayment.create({
        ...req.body,
        registration_no,
      });
      return res.status(201).json({
        success: true,
        message: "Payment created successfully",
        data: payment,
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= PREVIEW REGISTRATION NO ================= */

export const previewRegistrationNo = async (req, res) => {
  try {
    const { Seminar_day } = req.query;

    if (!Seminar_day) {
      return res.status(400).json({
        success: false,
        message: "Seminar day is required",
      });
    }

    const dayCodeMap = {
      "For 1st Day": "01",
      "For 2nd Day": "02",
      "For 3rd Day": "03",
      "For All Days": "04",
    };

    const dayCode = dayCodeMap[Seminar_day];

    if (!dayCode) {
      return res.status(400).json({
        success: false,
        message: "Invalid Seminar Day",
      });
    }

    const lastPayment = await AgsPayment.findOne({
      registration_no: { $regex: `^AGS/15th/${dayCode}/` },
    }).sort({ registration_no: -1 });

    let newNumber = 1;

    if (lastPayment) {
      const lastSeq = parseInt(lastPayment.registration_no.split("/")[3]);
      if (!isNaN(lastSeq)) {
        newNumber = lastSeq + 1;
      }
    }

    const paddedNumber = String(newNumber).padStart(3, "0");
    const registration_no = `AGS/15th/${dayCode}/${paddedNumber}`;

    res.json({
      success: true,
      registration_no,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ================= GET ALL ================= */

export const getAllAgsPayments = async (req, res) => {
  try {
    const payments = await AgsPayment.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET BY ID ================= */

export const getAgsPaymentById = async (req, res) => {
  try {
    const payment = await AgsPayment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.json({
      success: true,
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= UPDATE ================= */

export const updateAgsPayment = async (req, res) => {
  try {
    const updated = await AgsPayment.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updated_by: req.userId,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.json({
      success: true,
      message: "Payment updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= DELETE ================= */

export const deleteAgsPayment = async (req, res) => {
  try {
    const deleted = await AgsPayment.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.json({
      success: true,
      message: "Payment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
