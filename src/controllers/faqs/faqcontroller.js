import Faq from "../../models/faqs/FaqModel.js";

/* ======================================================
   CREATE FAQ
====================================================== */
export const createFaq = async (req, res) => {
  try {
    const { question, answer, status } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Question and Answer are required",
      });
    }

    const faq = await Faq.create({
      question,
      answer,
      category: "General",
      status: status || "active",
    });

    res.status(201).json({
      success: true,
      message: "FAQ added successfully",
      data: faq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   GET ALL FAQS (LIST)
====================================================== */
export const getAllFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: faqs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   GET SINGLE FAQ
====================================================== */
export const getFaq = async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    res.status(200).json({
      success: true,
      data: faq,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid FAQ ID",
    });
  }
};

/* ======================================================
   UPDATE FAQ
====================================================== */
export const updateFaq = async (req, res) => {
  try {
    const { question, answer, category, status } = req.body;

    const faq = await Faq.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    faq.question = question ?? faq.question;
    faq.answer = answer ?? faq.answer;
    faq.category = category ?? faq.category;
    faq.status = status ?? faq.status;

    await faq.save();

    res.status(200).json({
      success: true,
      message: "FAQ updated successfully",
      data: faq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   DELETE FAQ
====================================================== */
export const deleteFaq = async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    await faq.deleteOne();

    res.status(200).json({
      success: true,
      message: "FAQ deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ======================================================
   TOGGLE STATUS (ACTIVE / INACTIVE)
====================================================== */
export const toggleFaqStatus = async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    faq.status = faq.status === "active" ? "inactive" : "active";
    await faq.save();

    res.status(200).json({
      success: true,
      status: faq.status,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
