import express from "express";
import {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  downloadAssignmentFile,
} from "../controllers/assignments.js";
import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js"; 

const router = express.Router();


router.get("/download/:id", verifyToken, downloadAssignmentFile);
router.get("/", verifyToken, getAssignments);
router.get("/:id", verifyToken, getAssignmentById);

router.post("/", verifyToken, adminOnly, upload.single("file"), createAssignment);
router.put("/:id", verifyToken, adminOnly, upload.single("file"), updateAssignment);
router.delete("/:id", verifyToken, adminOnly, deleteAssignment);

export default router;
