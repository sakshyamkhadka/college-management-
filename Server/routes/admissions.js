import express from "express";
import {
  submitAdmission,
  getPendingAdmissions,
  getAdmissionById,
  approveAdmission,
  rejectAdmission
} from "../controllers/admissionController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/", submitAdmission);

// Protected routes (require token)
router.get("/pending", verifyToken, getPendingAdmissions);
router.get("/:admission_id", verifyToken, getAdmissionById);
router.post("/approve", verifyToken, approveAdmission);
router.post("/reject", verifyToken, rejectAdmission);

export default router;
