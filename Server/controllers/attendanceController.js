import { db } from "../config/db.js";

export const getAttendance = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        a.attendance_id,
        a.user_id,
        u.username,
        a.course_id,
        c.course_name,
        a.date,
        a.status
      FROM attendance a
      JOIN users u ON a.user_id = u.user_id
      JOIN Courses c ON a.course_id = c.course_id
      WHERE u.role_id = 5
      ORDER BY a.date DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const createAttendance = async (req, res) => {
  try {
    const { user_id, course_id, date, status } = req.body;

    const [result] = await db.query(
      "INSERT INTO attendance (user_id, course_id, date, status) VALUES (?,?,?,?)",
      [user_id, course_id, date, status]
    );

    res.json({ message: "Attendance recorded", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, course_id, date, status } = req.body;

    await db.query(
      "UPDATE attendance SET user_id=?, course_id=?, date=?, status=? WHERE attendance_id=?",
      [user_id, course_id, date, status, id]
    );

    res.json({ message: "Attendance updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "DELETE FROM attendance WHERE attendance_id=?",
      [id]
    );

    res.json({ message: "Attendance deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




export const getMyAttendance = async (req, res) => {
  try {
    const userId = req.user.user_id; 

    const [rows] = await db.query(
      `
      SELECT
        a.attendance_id,
        a.user_id,
        u.username,
        a.course_id,
        c.course_name,
        a.date,
        a.status
      FROM attendance a
      JOIN users u ON a.user_id = u.user_id
      JOIN Courses c ON a.course_id = c.course_id
      WHERE a.user_id = ?   
      ORDER BY a.date DESC
      `,
      [userId]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
