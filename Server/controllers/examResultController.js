import { db } from "../config/db.js";

/**
 * Helper function to calculate GPA dynamically
 */
const calculateGPA = (marks) => {
  if (marks >= 90) return 4.0;
  if (marks >= 80) return 3.0;
  if (marks >= 70) return 2.0;
  if (marks >= 60) return 1.0;
  return 0.0;
};

/**
 * Get all exam results (Admin / Teacher)
 */
export const getExamResults = async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT 
        er.result_id,
        er.course_name,
        er.username,
        u.first_name,
        u.last_name,
        er.marks_obtained,
        er.grade,
        CASE
          WHEN er.marks_obtained >= 90 THEN 4.0
          WHEN er.marks_obtained >= 80 THEN 3.0
          WHEN er.marks_obtained >= 70 THEN 2.0
          WHEN er.marks_obtained >= 60 THEN 1.0
          ELSE 0.0
        END AS GPA,
        er.created_at,
        er.updated_at
      FROM exam_results er
      JOIN users u ON er.username = u.username
    `);

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get single exam result by result_id
 */
export const getExamResultById = async (req, res) => {
  const { id } = req.params;

  try {
    const [results] = await db.query(
      `
      SELECT 
        er.result_id,
        er.course_name,
        er.username,
        u.first_name,
        u.last_name,
        er.marks_obtained,
        er.grade,
        CASE
          WHEN er.marks_obtained >= 90 THEN 4.0
          WHEN er.marks_obtained >= 80 THEN 3.0
          WHEN er.marks_obtained >= 70 THEN 2.0
          WHEN er.marks_obtained >= 60 THEN 1.0
          ELSE 0.0
        END AS GPA,
        er.created_at,
        er.updated_at
      FROM exam_results er
      JOIN users u ON er.username = u.username
      WHERE er.result_id = ?
      `,
      [id]
    );

    if (!results.length) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.json(results[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Create a new exam result
 */
export const createExamResult = async (req, res) => {
  const { course_name, username, marks_obtained, grade } = req.body;

  try {
    await db.query(
      `
      INSERT INTO exam_results (course_name, username, marks_obtained, grade)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        marks_obtained = VALUES(marks_obtained),
        grade = VALUES(grade),
        updated_at = CURRENT_TIMESTAMP
      `,
      [course_name, username, marks_obtained, grade]
    );

    res.json({ message: "Exam result saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update exam result by result_id
 */
export const updateExamResult = async (req, res) => {
  const { id } = req.params;
  const { course_name, username, marks_obtained, grade } = req.body;

  try {
    const [result] = await db.query(
      `
      UPDATE exam_results
      SET course_name=?, username=?, marks_obtained=?, grade=?, updated_at=CURRENT_TIMESTAMP
      WHERE result_id=?
      `,
      [course_name, username, marks_obtained, grade, id]
    );

    if (!result.affectedRows) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.json({ message: "Exam result updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Delete exam result by result_id
 */
export const deleteExamResult = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query(
      "DELETE FROM exam_results WHERE result_id = ?",
      [id]
    );

    if (!result.affectedRows) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.json({ message: "Exam result deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get logged-in student's exam results
 */
export const getMyExamResults = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const [results] = await db.query(
      `
      SELECT
        er.result_id,
        er.course_name,
        er.marks_obtained,
        er.grade,
        CASE
          WHEN er.marks_obtained >= 90 THEN 4.0
          WHEN er.marks_obtained >= 80 THEN 3.0
          WHEN er.marks_obtained >= 70 THEN 2.0
          WHEN er.marks_obtained >= 60 THEN 1.0
          ELSE 0.0
        END AS GPA,
        er.created_at
      FROM exam_results er
      JOIN users u ON er.username = u.username
      WHERE u.user_id = ?
      `,
      [userId]
    );

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
