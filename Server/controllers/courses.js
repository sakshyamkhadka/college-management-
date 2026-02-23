  import { db } from "../config/db.js";

  // Get all courses
  export const getCourses = async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM Courses WHERE deleted_at IS NULL");
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // get my course for specific user 
  export const getMyCourses = (req, res) => {
    const userId = req.user.user_id;

    db.query(
      `SELECT c.*
      FROM Courses c
      JOIN Enrollments e ON c.course_id = e.course_id
      WHERE e.user_id = ?`,
      [userId],
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
      }
    );
  };


  // Get course by ID
  export const getCourseById = async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM Courses WHERE course_id = ? AND deleted_at IS NULL", [req.params.id]);
      if (!rows.length) return res.status(404).json({ error: "Course not found" });
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // Create course
  export const createCourse = async (req, res) => {
    try {
      const { course_name, department, course_description, credits } = req.body;
      const [result] = await db.query(
        "INSERT INTO Courses (course_name, department, course_description, credits) VALUES (?, ?, ?, ?)",
        [course_name, department, course_description, credits]
      );
      res.json({ course_id: result.insertId, course_name, department, course_description, credits });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // Update course
  export const updateCourse = async (req, res) => {
    try {
      const { course_name, department, course_description, credits } = req.body;
      await db.query(
        "UPDATE Courses SET course_name=?, department=?, course_description=?, credits=? WHERE course_id=?",
        [course_name, department, course_description, credits, req.params.id]
      );
      res.json({ message: "Course updated successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // Soft delete course
  export const deleteCourse = async (req, res) => {
    try {
      await db.query("UPDATE Courses SET deleted_at=NOW() WHERE course_id=?", [req.params.id]);
      res.json({ message: "Course deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
