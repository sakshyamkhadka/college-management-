import { db } from "../config/db.js";
import path from "path";
import fs from "fs";

// =======================
// Get all assignments (students and admins)
// =======================
export const getAssignments = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Assignments");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =======================
// Get assignment by ID
// =======================
export const getAssignmentById = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM Assignments WHERE assignment_id = ?",
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: "Assignment not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =======================
// Create assignment (admin only)
// =======================
export const createAssignment = async (req, res) => {
  console.log("Here",req.body )
  try {
    const { course_id, title, description, assigned_date, due_date, max_marks } = req.body;
    
    // Get file path from uploaded file
    const file_path = req.file ? req.file.path : null;

    const [result] = await db.query(
      `INSERT INTO Assignments 
       (course_id, title, description, assigned_date, due_date, max_marks, file_path) 
       VALUES (?,?,?,?,?,?,?)`,
      [course_id, title, description, assigned_date, due_date, max_marks, file_path]
    );
    console.log(course_id, title, description, assigned_date, due_date, max_marks, file_path);

    res.json({
      assignment_id: result.insertId,
      course_id,
      title,
      description,
      assigned_date,
      due_date,
      max_marks,
      file_path,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =======================
// Update assignment (admin only)
// =======================
export const updateAssignment = async (req, res) => {
  try {
    const { course_id, title, description, assigned_date, due_date, max_marks } = req.body;
    const file_path = req.file ? req.file.path : null;

    let sql = `UPDATE Assignments 
               SET course_id=?, title=?, description=?, assigned_date=?, due_date=?, max_marks=?`;
    const values = [course_id, title, description, assigned_date, due_date, max_marks];

    // Update file path if a new file is uploaded
    if (file_path) {
      sql += `, file_path=?`;
      values.push(file_path);
    }

    sql += ` WHERE assignment_id=?`;
    values.push(req.params.id);

    await db.query(sql, values);

    res.json({ message: "Assignment updated successfully", file_path });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =======================
// Delete assignment (admin only)
// =======================
export const deleteAssignment = async (req, res) => {
  try {
    // Optional: delete the file from the server too
    const [rows] = await db.query("SELECT file_path FROM Assignments WHERE assignment_id=?", [req.params.id]);
    if (rows.length && rows[0].file_path && fs.existsSync(rows[0].file_path)) {
      fs.unlinkSync(rows[0].file_path);
    }

    await db.query("DELETE FROM Assignments WHERE assignment_id=?", [req.params.id]);
    res.json({ message: "Assignment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =======================
// Download assignment file
// =======================
export const downloadAssignmentFile = async (req, res) => {
  try {
    const assignmentId = req.params.id;

    // Get file path from DB
    const [rows] = await db.query(
      "SELECT file_path  FROM Assignments WHERE assignment_id = ?",
      [assignmentId]
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const filePath = rows[0].file_path;
    const originalName = rows[0].original_name || `assignment-${assignmentId}`;

    const absolutePath = path.resolve(filePath);

    // Check if file exists
    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({ error: "File not found on server" });
    }

    // Force download with proper filename
    res.download(absolutePath, originalName, (err) => {
      if (err) {
        console.error("Download error:", err);
        if (!res.headersSent) {
          res.status(500).json({ error: "Error downloading file" });
        }
      }
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: err.message });
  }
};