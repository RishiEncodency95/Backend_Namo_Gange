import express from "express";
import {
    createEnquiryList,
    getAllEnquiryLists,
    getEnquiryListById,
    updateEnquiryList,
    deleteEnquiryList,
} from "../../controllers/enquiry_list/enquiryListController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", createEnquiryList);
router.get("/", getAllEnquiryLists);
router.get("/:id", getEnquiryListById);
router.put("/:id", authMiddleware, updateEnquiryList);
router.delete("/:id", authMiddleware, deleteEnquiryList);

export default router;