import { db } from "../config/db.js";

/**
 * Get all enrollments
 */
export const getEnrollments = async (req, res) => {
  try {
    const [results] = await db.query(
      "SELECT * FROM Enrollments WHERE deleted_at IS NULL"
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get enrollment by ID
 */
export const getEnrollmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await db.query(
      "SELECT * FROM Enrollments WHERE enrollment_id=? AND deleted_at IS NULL",
      [id]
    );
    if (!results.length)
      return res.status(404).json({ message: "Enrollment not found" });
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Create enrollment
 */
export const createEnrollment = async (req, res) => {
  const { username, course_name, grade, semester } = req.body;

  if (!username || !course_name || !semester) {
    return res.status(400).json({
      message: "username, course_name, and semester are required",
    });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO Enrollments (username, course_name, grade, semester) VALUES (?, ?, ?, ?)",
      [username, course_name, grade || null, semester]
    );

    // Fetch the newly created enrollment
    const [rows] = await db.query(
      "SELECT * FROM Enrollments WHERE enrollment_id=?",
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update enrollment
 */
export const updateEnrollment = async (req, res) => {
  const { id } = req.params;
  const { username, course_name, grade, semester } = req.body;

  if (!username || !course_name || !semester) {
    return res.status(400).json({
      message: "username, course_name, and semester are required",
    });
  }

  try {
    const [result] = await db.query(
      `UPDATE Enrollments
       SET username=?, course_name=?, grade=?, semester=?
       WHERE enrollment_id=? AND deleted_at IS NULL`,
      [username, course_name, grade || null, semester, id]
    );

    if (!result.affectedRows)
      return res.status(404).json({ message: "Enrollment not found" });

    // Fetch the updated enrollment
    const [rows] = await db.query(
      "SELECT * FROM Enrollments WHERE enrollment_id=?",
      [id]
    );

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Delete enrollment (soft delete)
 */
export const deleteEnrollment = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query(
      "UPDATE Enrollments SET deleted_at=NOW() WHERE enrollment_id=? AND deleted_at IS NULL",
      [id]
    );

    if (!result.affectedRows)
      return res.status(404).json({ message: "Enrollment not found" });

    res.json({ message: "Enrollment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
