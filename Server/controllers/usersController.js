import { db } from "../config/db.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
  try {
    const [results] = await db.query(
      "SELECT * FROM users WHERE deleted_at IS NULL"
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      role_id,
      roll_no,
      first_name,
      last_name,
      status,
      dob,
      gender,
      address,
      department,
      enrollment_year,
      phone_number,
      semester
    } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users 
      (username, email, password_hash, role_id, roll_no, first_name, last_name, status,
       dob, gender, address, department, enrollment_year, phone_number, semester)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    const params = [
      username,
      email,
      hashed,
      role_id,
      roll_no || null,
      first_name || "",
      last_name || "",
      status || "active",
      dob || null,
      gender || null,
      address || null,
      department || null,
      enrollment_year || null,
      phone_number || null,
      semester || null
    ];

    const [result] = await db.query(query, params);
    res.json({ message: "User created", user_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      username,
      email,
      role_id,
      roll_no,
      first_name,
      last_name,
      status,
      dob,
      gender,
      address,
      department,
      enrollment_year,
      phone_number,
      semester
    } = req.body;

    await db.query(
      `UPDATE users SET
        username=?,
        email=?,
        role_id=?,
        roll_no=?,
        first_name=?,
        last_name=?,
        status=?,
        dob=?,
        gender=?,
        address=?,
        department=?,
        enrollment_year=?,
        phone_number=?,
        semester=?
      WHERE user_id=?`,
      [
        username,
        email,
        role_id,
        roll_no || null,
        first_name || "",
        last_name || "",
        status || "active",
        dob || null,
        gender || null,
        address || null,
        department || null,
        enrollment_year || null,
        phone_number || null,
        semester || null,
        id
      ]
    );

    res.json({ message: "User updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await db.query(
      "UPDATE users SET deleted_at=NOW() WHERE user_id=?",
      [id]
    );
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
