import { db } from "../config/db.js";

export const getRoles = async (req, res) => {
  try {
    const [results] = await db.promise().query("SELECT * FROM Roles");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createRole = async (req, res) => {
  const { role_name } = req.body;
  try {
    const [result] = await db.promise().query("INSERT INTO Roles (role_name) VALUES (?)", [role_name]);
    res.json({ message: "Role created", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRole = async (req, res) => {
  const id = req.params.id;
  const { role_name } = req.body;
  try {
    await db.promise().query("UPDATE Roles SET role_name=? WHERE role_id=?", [role_name, id]);
    res.json({ message: "Role updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteRole = async (req, res) => {
  const id = req.params.id;
  try {
    await db.promise().query("DELETE FROM Roles WHERE role_id=?", [id]);
    res.json({ message: "Role deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
