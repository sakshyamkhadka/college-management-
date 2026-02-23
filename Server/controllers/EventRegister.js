import { db } from "../config/db.js";

/**
 * Get all registrations
 */
export const getRegistrations = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM event_registration");
    res.json(results);
    console.log(results)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get registration by ID
 */
export const getRegistrationById = async (req, res) => {
  const { id } = req.params;

  try {
    const [results] = await db.query(
      "SELECT * FROM event_registration WHERE id=?",
      [id]
    );

    if (!results.length)
      return res.status(404).json({ message: "Registration not found" });

    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get registrations by event ID
 */
export const getRegistrationsByEvent = async (req, res) => {
  const { event_id } = req.params;

  try {
    const [results] = await db.query(
      "SELECT * FROM event_registration WHERE event_id=?",
      [event_id]
    );

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Create registration
 */
export const createRegistration = async (req, res) => {
  const { event_id, email, phone, address, semester } = req.body;
  console.log(event_id)

  if (!event_id || !email || !phone) {
    return res.status(400).json({
      message: "event_id, email, and phone are required",
    });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO event_registration (event_id, email, phone, address, semester) VALUES (?, ?, ?, ?, ?)",
      [event_id, email, phone, address || null, semester || null]
    );

    const [rows] = await db.query(
      "SELECT * FROM event_registration WHERE id=?",
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update registration
 */
export const updateRegistration = async (req, res) => {
  const { id } = req.params;
  const { event_id, email, phone, address, semester } = req.body;

  if (!event_id || !email || !phone) {
    return res.status(400).json({
      message: "event_id, email, and phone are required",
    });
  }

  try {
    const [result] = await db.query(
      `UPDATE event_registration
       SET event_id=?, email=?, phone=?, address=?, semester=?
       WHERE id=?`,
      [event_id, email, phone, address || null, semester || null, id]
    );

    if (!result.affectedRows)
      return res.status(404).json({ message: "Registration not found" });

    const [rows] = await db.query(
      "SELECT * FROM event_registration WHERE id=?",
      [id]
    );

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Delete registration
 */
export const deleteRegistration = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query(
      "DELETE FROM event_registration WHERE id=?",
      [id]
    );

    if (!result.affectedRows)
      return res.status(404).json({ message: "Registration not found" });

    res.json({ message: "Registration deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};