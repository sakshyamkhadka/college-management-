import express from "express";
import { 
  getExamResults, 
  createExamResult, 
  updateExamResult, 
  deleteExamResult,
  getMyExamResults
} from "../controllers/examResultController.js";
import { verifyToken } from "../middleware/authMiddleware.js"; 

const router = express.Router();


router.get("/", verifyToken, getExamResults);

router.get("/my-results", verifyToken, getMyExamResults);


router.post("/", verifyToken, createExamResult);
router.put("/:id", verifyToken, updateExamResult);
router.delete("/:id", verifyToken, deleteExamResult);

export default router;
