import express from "express";
import {
  getAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
  getMyAttendance
} from "../controllers/attendanceController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAttendance);
router.post("/", createAttendance);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

router.get("/my-attendance", verifyToken, getMyAttendance);

export default router;
