import express from "express";
import { getMyProfile } from "../controllers/studentController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", verifyToken, getMyProfile);

export default router;
