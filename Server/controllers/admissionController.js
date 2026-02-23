import { db } from "../config/db.js";
import { sendAdmissionEmail } from "../config/emailSender.js";

export const submitAdmission = async (req, res) => {
  const { first_name, last_name, email, phone_number, address, course, gender } = req.body;
  if (!first_name || !last_name || !email || !phone_number || !address || !course || !gender) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const username = first_name.toLowerCase();

  try {
    await db.query(
      "INSERT INTO admissions (first_name,last_name,username,email,phone_number,address,department,gender,status,created_at) VALUES (?,?,?,?,?,?,?,?,?,NOW())",
      [first_name, last_name, username, email, phone_number, address, course, gender, "pending"]
    );

    res.status(201).json({ message: "Admission submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPendingAdmissions = async (req, res) => {
  try {
    const [results] = await db.query(
      `SELECT admission_id, first_name, last_name, username, email, phone_number, address, department, gender, status, created_at 
       FROM admissions WHERE status='pending'`
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAdmissionById = async (req, res) => {
  const { admission_id } = req.params;
  try {
    const [results] = await db.query(
      "SELECT admission_id, first_name, last_name, username, email, phone_number, address, department, gender, status, created_at FROM admissions WHERE admission_id=?",
      [admission_id]
    );
    if (!results.length) return res.status(404).json({ message: "Admission not found" });
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const approveAdmission = async (req, res) => {
  const { admission_id, role_id } = req.body;
  if (!admission_id || !role_id) return res.status(400).json({ message: "Admission ID and Role ID required" });

  try {
    const [results] = await db.query("SELECT * FROM admissions WHERE admission_id=?", [admission_id]);
    if (!results.length) return res.status(404).json({ message: "Admission not found" });

    const admission = results[0];

    const nepaliYear = new Date().getFullYear() + 56;
    const semester = 1;

    await db.query(
      `INSERT INTO users 
      (username,email,password_hash,role_id,first_name,last_name,gender,address,department,enrollment_year,semester,phone_number,created_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,NOW())`,
      [
        admission.username,
        admission.email,
        "defaultpassword",
        role_id,
        admission.first_name,
        admission.last_name,
        admission.gender,
        admission.address,
        admission.department,
        nepaliYear,
        semester,
        admission.phone_number
      ]
    );

    await db.query("UPDATE admissions SET status='approved' WHERE admission_id=?", [admission_id]);

    await sendAdmissionEmail(admission.email, admission.first_name, "approved");

    res.json({ message: "Admission approved, user created, and email sent", email: admission.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const rejectAdmission = async (req, res) => {
  const { admission_id } = req.body;
  if (!admission_id) return res.status(400).json({ message: "Admission ID required" });

  try {
    const [results] = await db.query("SELECT * FROM admissions WHERE admission_id=?", [admission_id]);
    if (!results.length) return res.status(404).json({ message: "Admission not found" });

    await db.query("UPDATE admissions SET status='rejected' WHERE admission_id=?", [admission_id]);

    const admission = results[0];

    await sendAdmissionEmail(admission.email, admission.first_name, "rejected");

    res.json({ message: "Admission rejected and email sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAdmission = async (req, res) => {
  const { admission_id } = req.params;
  try {
    const [results] = await db.query("DELETE FROM admissions WHERE admission_id=?", [admission_id]);
    if (results.affectedRows === 0) return res.status(404).json({ message: "Admission not found" });
    res.json({ message: "Admission deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
