import Bank from "../../models/add_by_admin/bankModel.js";

/* ===============================
   CREATE BANK
================================ */
export const createBank = async (req, res) => {
  try {
    const {
      bank_name,
      bank_branch,
      account_number,
      ifsc_code,
      status,
      created_by,
    } = req.body;

    if (!bank_name || !account_number || !ifsc_code) {
      return res.status(400).json({
        success: false,
        message: "Bank name, account number and IFSC code are required",
      });
    }

    const data = await Bank.create({
      bank_name,
      bank_branch,
      account_number,
      ifsc_code,
      status,
      created_by,
    });

    res.status(201).json({
      success: true,
      message: "Bank created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   GET ALL BANKS
================================ */
export const getAllBanks = async (req, res) => {
  try {
    const data = await Bank.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   GET BANK BY ID
================================ */
export const getBankById = async (req, res) => {
  try {
    const data = await Bank.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Bank not found",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   UPDATE BANK
================================ */
export const updateBank = async (req, res) => {
  try {
    const bank = await Bank.findById(req.params.id);

    if (!bank) {
      return res.status(404).json({
        success: false,
        message: "Bank not found",
      });
    }

    bank.bank_name = req.body.bank_name ?? bank.bank_name;
    bank.bank_branch = req.body.bank_branch ?? bank.bank_branch;
    bank.account_number = req.body.account_number ?? bank.account_number;
    bank.ifsc_code = req.body.ifsc_code ?? bank.ifsc_code;
    bank.status = req.body.status ?? bank.status;
    bank.updated_by = req.body.updated_by ?? bank.updated_by;

    await bank.save();

    res.status(200).json({
      success: true,
      message: "Bank updated successfully",
      data: bank,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   DELETE BANK
================================ */
export const deleteBank = async (req, res) => {
  try {
    const data = await Bank.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Bank not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bank deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
