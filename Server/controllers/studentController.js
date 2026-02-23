import { db } from "../config/db.js";

export const getMyProfile = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const [rows] = await db.query(
      `SELECT 
        user_id,
        username,
        roll_no,
        email,
        first_name,
        last_name,
        dob,
        gender,
        address,
        department,
        enrollment_year,
        phone_number,
        semester
      FROM users 
      WHERE user_id = ?`,
      [user_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
