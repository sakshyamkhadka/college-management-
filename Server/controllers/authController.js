import { db } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const register = async (req, res) => {
  try {
    let { username, email, password, role_id, first_name, last_name } = req.body;

    if (!username || !email || !password || !role_id) {
      return res.status(400).json({ message: "All fields required" });
    }

    email = email.toLowerCase().trim();
    username = username.trim();

    const [existing] = await db.query(
      "SELECT email, username FROM users WHERE (email=? OR username=?) AND deleted_at IS NULL",
      [email, username]
    );

    if (existing.length > 0) {
      if (existing[0].email === email) {
        return res.status(400).json({ message: "Email already exists" });
      }
      if (existing[0].username === username) {
        return res.status(400).json({ message: "Username already exists" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO users 
      (username, email, password_hash, role_id, first_name, last_name) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [username, email, hashedPassword, role_id, first_name || "", last_name || ""]
    );

    res.status(201).json({
      message: "User registered",
      user_id: result.insertId
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });
    const [results] = await db.query("SELECT * FROM users WHERE email=? AND deleted_at IS NULL", [email]);
    if (results.length === 0) return res.status(400).json({ message: "Invalid credentials kiyutjrhtgerfdsa" });
    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials aaaaaa" });
    const token = jwt.sign({ user_id: user.user_id, email: user.email, role_id: user.role_id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: { user_id: user.user_id, email: user.email, username: user.username, role_id: user.role_id } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
