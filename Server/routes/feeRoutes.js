import express from "express";
import { getFees, getFeeById, createFee, updateFee, deleteFee } from "../controllers/feesController.js";

const router = express.Router();

router.get("/", getFees);
router.get("/:fee_id", getFeeById);
router.post("/", createFee);
router.put("/:fee_id", updateFee);
router.delete("/:fee_id", deleteFee);

export default router;
