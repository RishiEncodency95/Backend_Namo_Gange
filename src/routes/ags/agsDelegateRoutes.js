import express from "express";
import {
  createAGSDelegate,
  getAllAGSDelegates,
  getAGSDelegateById,
  updateAGSDelegate,
  deleteAGSDelegate,
} from "../../controllers/ags/agsDelegateController.js";

const router = express.Router();    

router.post("/create", createAGSDelegate);
router.get("/", getAllAGSDelegates);
router.get("/:id", getAGSDelegateById);
router.put("/:id", updateAGSDelegate);
router.delete("/:id", deleteAGSDelegate);

export default router;