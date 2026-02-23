import express from "express";
import { getCourses, getCourseById, createCourse, updateCourse, deleteCourse, getMyCourses } from "../controllers/courses.js";

const router = express.Router();

router.get("/", getCourses);          
router.get("/:id", getCourseById);    
router.post("/", createCourse);      
router.put("/:id", updateCourse);     
router.delete("/:id", deleteCourse);  
router.get("/my", getMyCourses);


export default router;
