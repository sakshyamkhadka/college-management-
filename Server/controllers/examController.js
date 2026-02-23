// controllers/examController.js
import { db } from "../config/db.js";

/**
 * ============================
 * Get all exams
 * ============================
 * */
export const getExams = async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT 
        e.exam_id,
        e.course_id,
        c.course_name,
        e.exam_name,
        e.exam_date,
        e.max_marks
      FROM exams e
      JOIN Courses c ON e.course_id = c.course_id
      ORDER BY e.exam_date DESC
    `);

    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching exams:", err);
    res.status(500).json({
      error: "Failed to fetch exams",
      details: err.message,
    });
  }
};

/**
 * ============================
 * Get exam by ID
 * ============================
 */
export const getExamById = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await db.query("SELECT * FROM exams WHERE exam_id = ?", [id]);

    if (results.length === 0) {
      return res.status(404).json({ error: "Exam not found" });
    }

    res.status(200).json(results[0]);
  } catch (err) {
    console.error(`Error fetching exam with id ${id}:`, err);
    res.status(500).json({
      error: "Failed to fetch exam",
      details: err.message,
    });
  }
};

/**
 * ============================
 * Create new exam
 * ============================
 */
export const createExam = async (req, res) => {
  const { course_id, exam_name, exam_date, max_marks } = req.body;

  if (!course_id || !exam_name || !exam_date || !max_marks) {
    return res.status(400).json({
      error: "course_id, exam_name, exam_date, and max_marks are required",
    });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO exams (course_id, exam_name, exam_date, max_marks)
       VALUES (?, ?, ?, ?)`,
      [course_id, exam_name, exam_date, max_marks]
    );

    res.status(201).json({
      message: "Exam created successfully",
      exam_id: result.insertId,
    });
  } catch (err) {
    console.error("Error creating exam:", err);
    res.status(500).json({
      error: "Failed to create exam",
      details: err.message,
    });
  }
};

/**
 * ============================
 * Update exam
 * ============================
 */
export const updateExam = async (req, res) => {
  const { id } = req.params;
  const { course_id, exam_name, exam_date, max_marks } = req.body;

  if (!course_id || !exam_name || !exam_date || !max_marks) {
    return res.status(400).json({
      error: "course_id, exam_name, exam_date, and max_marks are required",
    });
  }

  try {
    const [result] = await db.query(
      `UPDATE exams
       SET course_id = ?, exam_name = ?, exam_date = ?, max_marks = ?
       WHERE exam_id = ?`,
      [course_id, exam_name, exam_date, max_marks, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Exam not found" });
    }

    res.status(200).json({ message: "Exam updated successfully" });
  } catch (err) {
    console.error(`Error updating exam with id ${id}:`, err);
    res.status(500).json({
      error: "Failed to update exam",
      details: err.message,
    });
  }
};

/**
 * ============================
 * Delete exam
 * ============================
 */
export const deleteExam = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM exams WHERE exam_id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Exam not found" });
    }

    res.status(200).json({ message: "Exam deleted successfully" });
  } catch (err) {
    console.error(`Error deleting exam with id ${id}:`, err);
    res.status(500).json({
      error: "Failed to delete exam",
      details: err.message,
    });
  }
};
