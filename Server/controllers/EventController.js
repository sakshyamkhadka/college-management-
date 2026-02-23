import { db } from "../config/db.js";

/**
 * Get all events
 */
export const getEvents = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM event");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get event by ID
 */
export const getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const [results] = await db.query(
      "SELECT * FROM event WHERE id=?",
      [id]
    );

    if (!results.length)
      return res.status(404).json({ message: "Event not found" });

    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Create event
 */
export const createEvent = async (req, res) => {
  const { title, description, startDate, endDate } = req.body;

  if (!title || !startDate || !endDate) {
    return res.status(400).json({
      message: "title, startDate, and endDate are required",
    });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO event (title, description, startDate, endDate) VALUES (?, ?, ?, ?)",
      [title, description || null, startDate, endDate]
    );

    const [rows] = await db.query(
      "SELECT * FROM event WHERE id=?",
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update event
 */
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, startDate, endDate } = req.body;

  if (!title || !startDate || !endDate) {
    return res.status(400).json({
      message: "title, startDate, and endDate are required",
    });
  }

  try {
    const [result] = await db.query(
      `UPDATE event
       SET title=?, description=?, startDate=?, endDate=?
       WHERE id=?`,
      [title, description || null, startDate, endDate, id]
    );

    if (!result.affectedRows)
      return res.status(404).json({ message: "Event not found" });

    const [rows] = await db.query(
      "SELECT * FROM event WHERE id=?",
      [id]
    );

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Delete event (hard delete)
 */


export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query(
      "DELETE FROM event WHERE id=?",
      [id]
    );

    if (!result.affectedRows)
      return res.status(404).json({ message: "Event not found" });

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
