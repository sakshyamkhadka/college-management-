import { db } from '../config/db.js';

export const getFees = async (req, res) => {
  const user = req.user;
  try {
    let query = `
      SELECT f.fee_id, f.fee_name, f.amount, f.due_date,
             u.user_id, u.username, u.first_name, u.last_name
      FROM Fees f
      JOIN users u ON u.user_id = f.student_id
      WHERE f.deleted_at IS NULL AND u.deleted_at IS NULL
    `;
    const params = [];

    if (user.role_id !== 1) {
      query += ` AND f.student_id = ?`;
      params.push(user.user_id);
    }

    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFeeById = async (req, res) => {
  const { fee_id } = req.params;
  const user = req.user;
  try {
    const [fee] = await db.execute(
      `SELECT f.fee_id, f.fee_name, f.amount, f.due_date,
              u.user_id, u.username, u.first_name, u.last_name
       FROM Fees f
       JOIN users u ON u.user_id = f.student_id
       WHERE f.fee_id = ? AND f.deleted_at IS NULL AND u.deleted_at IS NULL`,
      [fee_id]
    );

    if (!fee.length) return res.status(404).json({ message: "Fee not found" });

    if (user.role_id !== 1 && fee[0].user_id !== user.user_id) {
      return res.status(403).json({ message: "Not authorized to view this fee" });
    }

    const [payments] = await db.execute(
      `SELECT * FROM Payments WHERE fee_id = ? AND deleted_at IS NULL`,
      [fee_id]
    );

    res.json({ fee: fee[0], payments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createFee = async (req, res) => {
  const user = req.user;
  if (user.role_id !== 1) return res.status(403).json({ message: "Not authorized" });

  const { student_id, fee_name, amount, due_date } = req.body;
  if (!student_id || !fee_name || !amount || !due_date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [result] = await db.execute(
      `INSERT INTO Fees (student_id, fee_name, amount, due_date) VALUES (?, ?, ?, ?)`,
      [student_id, fee_name, amount, due_date]
    );
    res.status(201).json({ message: "Fee created", fee_id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateFee = async (req, res) => {
  const user = req.user;
  if (user.role_id !== 1) return res.status(403).json({ message: "Not authorized" });

  const { fee_id } = req.params;
  const { student_id, fee_name, amount, due_date } = req.body;
  if (!student_id || !fee_name || !amount || !due_date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [result] = await db.execute(
      `UPDATE Fees SET student_id = ?, fee_name = ?, amount = ?, due_date = ? 
       WHERE fee_id = ? AND deleted_at IS NULL`,
      [student_id, fee_name, amount, due_date, fee_id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: "Fee not found" });

    res.json({ message: "Fee updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteFee = async (req, res) => {
  const user = req.user;
  if (user.role_id !== 1) return res.status(403).json({ message: "Not authorized" });

  const { fee_id } = req.params;
  try {
    const [result] = await db.execute(
      `UPDATE Fees SET deleted_at = NOW() WHERE fee_id = ? AND deleted_at IS NULL`,
      [fee_id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: "Fee not found" });

    res.json({ message: "Fee deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
