import express from "express";
import {
  createClientStatus,
  getAllClientStatuses,
  getClientStatusByClientId,
  updateClientStatus,
  deleteClientStatus,
} from "../../controllers/clientStatus/clientStatus.controller.js";

const router = express.Router();

router.post("/create", createClientStatus);
router.get("/", getAllClientStatuses);
router.get("/client/:clientId", getClientStatusByClientId);
router.put("/:id", updateClientStatus);
router.delete("/:id", deleteClientStatus);

export default router;
