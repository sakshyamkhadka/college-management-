import React, { useEffect, useState } from "react";
import {
  getRegistrations,
  deleteRegistration,
} from "../config/Api";

const EventModel = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all registrations on mount
  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const data = await getRegistrations();
      setRegistrations(data);
    } catch (err) {
      setError(err.message || "Failed to fetch registrations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  // Delete registration
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this registration?")) return;

    try {
      await deleteRegistration(id);
      setRegistrations((prev) => prev.filter((reg) => reg._id !== id));
    } catch (err) {
      alert(err.message || "Delete failed");
    }
  };

  if (loading) return <p>Loading registrations...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Event Registrations</h2>
      {registrations.length === 0 ? (
        <p>No registrations found.</p>
      ) : (
        <table border="1" cellPadding="10" width="100%">
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Semester</th>
              <th>Registered At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg.id}>
                <td>{reg.event_id}</td>
                <td>{reg.email}</td>
                <td>{reg.phone}</td>
                <td>{reg.semester}</td>
                <td>{new Date(reg.registerat).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleDelete(reg.id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EventModel;