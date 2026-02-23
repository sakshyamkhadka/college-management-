import express from "express";
import {
  getEnrollments,
  getEnrollmentById,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment
} from "../controllers/enrollmentsController.js";

import  { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getEnrollments);
router.get("/:id", getEnrollmentById);

// Protected routes
router.post("/", verifyToken, createEnrollment);
router.put("/:id", verifyToken, updateEnrollment);
router.delete("/:id", verifyToken, deleteEnrollment);

export default router;
